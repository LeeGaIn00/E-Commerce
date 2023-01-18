import pandas as pd
import requests
from bs4 import BeautifulSoup as bs
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import pymysql

chrome_options = webdriver.ChromeOptions()
driver = webdriver.Chrome()
#driver = webdriver.Chrome(executable_path=ChromeDriverManager(version='102.0.5005.27').install(), chrome_options=options)

# DB 연결
conn = pymysql.connect(
    host='127.0.0.1',
    port=3306,
    user='root',
    password='dlrkdls7815',
    db='ecommdb',
    charset='utf8'
)
conn.set_charset('utf8mb4')
curs = conn.cursor()

# 상의 url = "https://www.musinsa.com/categories/item/001"
# 아우터 url = 'https://www.musinsa.com/categories/item/002'
# 바지 url = 'https://www.musinsa.com/categories/item/003'
# 원피스 url = 'https://www.musinsa.com/categories/item/020'
# 스커트 url = 'https://www.musinsa.com/categories/item/022'
# 신발 url = 'https://www.musinsa.com/categories/item/005'
# 여성 가방 url = 'https://www.musinsa.com/categories/item/054'
# 모자 url = 'https://www.musinsa.com/categories/item/007'
# 양말/레그웨어 url = 'https://www.musinsa.com/categories/item/008'
# 액세서리 url = 'https://www.musinsa.com/categories/item/011'
category_id = 10
response = requests.get(url)
html = bs(response.text, 'lxml')

brand_html=html.select('#searchList > .li_box > .li_inner > .list_img > a')

href_list=[]
for i in brand_html:
    href_list.append('https:'+i.get('href'))

for i in href_list:
    driver.get(i)
    soup = bs(driver.page_source, 'html.parser')

    try:
        # 옵션 3개 이상부터는 무시
        addopt = soup.select_one('#addopt1')
        if addopt is not None:
            continue

        name = soup.select_one('#page_product_detail > div.right_area.page_detail_product > div.right_contents.section_product_summary > span > em').get_text()
        price = soup.select_one('#goods_price').get_text().replace('원', '').replace(',', '').replace("\n", "")
        discount = soup.select_one('#list_price').get_text().split(' ')[0].replace('원', '').replace(',', '')
        image = soup.select_one('#bigimg').get('src')
        image = 'https:' + image
        detail = soup.select_one('#detail_view > img')
        if detail is None:
            detail = soup.select_one('#detail_view > p > img')
        if detail is None:
            detail = soup.select_one('#detail_view > div > img')
        if detail is None:
            detail = soup.select_one('#detail_view > center > img')
        if detail is None:
            detail = soup.select_one('#detail_view > detail. > img')
        detail = detail['src']
        if detail.startswith('//'):
            detail = 'http:' + detail # http:로 시작 안하는 것들 변환

        opt = ''
        opt1_all = []; opt1_list = []; opt1 = '';
        opt2_all = []; opt2_list = []; opt2 = '';
        opt1_all = soup.select('#option1 > option')
        opt2_all = soup.select('#option2 > option')

        if len(opt2_all) != 0:
            select_opt1 = driver.find_element_by_css_selector("#option1 > option:nth-of-type(2)")
            select_opt1.click()
            time.sleep(0.5)
            opt2_all = driver.find_elements_by_css_selector('#option2 > option')

        # 단일 옵션
        if soup.select_one('#buy_option_area > div.wrap-select-opt.box-top-line') is not None:
            opt = soup.select_one('#buy_option_area > div.wrap-select-opt.box-top-line')

        # 다중 옵션
        if len(opt1_all) != 0:
            for o in opt1_all[1:]: # '옵션 선택' 제외
                if '품절' not in o['value']: opt1_list.append(o['value'])
            opt1 = "/".join(opt1_list)

        if len(opt2_all) != 0:
            for o in opt2_all[1:]: # '옵션 선택' 제외
                if '품절' not in o.text: opt2_list.append(o.text)
            opt2 = "/".join(opt2_list)

        # product INSERT
        if opt1 == '': # 단일 옵션 (options INSERT X)
            sql = "INSERT INTO product (name, price, discount, image, detail, option1, category_id) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            curs.execute(sql, (name, price, discount, image, detail, opt, category_id))
            # options
            curs.execute("SELECT MAX(id) FROM product") # 방금 INSERT한 id 가져옴
            product_id = curs.fetchone()
            sql = "INSERT INTO options (option1, stock, product_id) VALUES (%s, %s, %s)"
            for op in opt1_list:
                curs.execute(sql, (opt, 999, product_id))
        elif opt2 == '': # option1
            # product
            sql = "INSERT INTO product (name, price, discount, image, detail, option1, category_id) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            curs.execute(sql, (name, price, discount, image, detail, opt1, category_id))
            # options
            curs.execute("SELECT MAX(id) FROM product") # 방금 INSERT한 id 가져옴
            product_id = curs.fetchone()
            sql = "INSERT INTO options (option1, stock, product_id) VALUES (%s, %s, %s)"
            for op in opt1_list:
                curs.execute(sql, (op, 999, product_id))
        else:
            # product
            sql = "INSERT INTO product (name, price, discount, image, detail, option1, option2, category_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
            curs.execute(sql, (name, price, discount, image, detail, opt1, opt2, category_id))
            # options
            curs.execute("SELECT MAX(id) FROM product") # 방금 INSERT한 id 가져옴
            product_id = curs.fetchone()
            sql = "INSERT INTO options (option1, option2, stock, product_id) VALUES (%s, %s, %s, %s)"
            for op1 in opt1_list:
                for op2 in opt2_list:
                    curs.execute(sql, (op1, op2, 999, product_id))
        conn.commit()
    except:
        continue