package com.ecomm.back.controller;

import com.ecomm.back.dto.*;
import com.ecomm.back.model.Category;
import com.ecomm.back.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/shop")
public class ShopController {
    private final ShopService shopService;

    /* 카테고리 불러오기 */
    @GetMapping("/category-list")
    public List<Category> getCateList() {
        return shopService.getCateList();
    }

    /* 카테고리별 상품 불러오기 */
    @PostMapping("/{categoryId}")
    public List<ProductListDto> getProducts(@PathVariable String categoryId) {
        return shopService.getProducts(Integer.parseInt(categoryId));
    }

    @GetMapping("/detail/{id}")
    public ProductDto getProductById(@PathVariable String id) {
        return shopService.getProductById(Integer.parseInt(id));
    }

    @GetMapping("/search")
    public List<ProductListDto> search(@RequestParam String keyword){
        return shopService.searchProducts(keyword);
    }

    /* 장바구니 */
    @PostMapping("/cart")
    public CartResponseDto addCart(@RequestBody CartRequestDto cartRequestDto) {
        return shopService.addCart(cartRequestDto);
    }

    @GetMapping("/cart/{memberId}")
    public List<CartListDto> getCartItem(@PathVariable String memberId) {
        return shopService.getCartItem(memberId);
    }

    @PutMapping("/cart/{id}")
    public CartResponseDto updateCart(@PathVariable Integer id, @RequestBody CartRequestDto cartRequestDto) {
        return shopService.updateCart(id, cartRequestDto);
    }

    @DeleteMapping("/cart/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCart(@PathVariable Integer id) {
        return shopService.deleteCart(id);
    }

//    @PostMapping("/images/upload")
//    public void imageUpload(@RequestParam(value="file", required = false) List<MultipartFile> files) {
//        String UPLOAD_PATH = System.getProperty("user.home") + System.getProperty("file.separator") + "images" + System.getProperty("file.separator");
//
//        // 시간과 originalFilename으로 매핑 시켜서 src 주소를 만들어 낸다.
//        Date date = new Date();
//        StringBuilder sb = new StringBuilder();
//
//        if(files == null) {
//            sb.append("none");
//        } else {
//            try {
//                for (MultipartFile file : files) {
//                    sb.append(date.getTime()).append(file.getOriginalFilename().replace(" ", ""));
//                    File fileSave = new File(UPLOAD_PATH + sb.toString()); // ex) fileId.jpg
//                    if (!fileSave.exists()) { // 폴더가 없을 경우 폴더 만들기
//                        fileSave.mkdirs();
//                    }
//                    file.transferTo(fileSave); // fileSave의 형태로 파일 저장
//                    sb.setLength(0);
//                }
//            } catch(IOException e) {
//                e.printStackTrace();
//            }
//        }
//
//        System.out.println("========= 디버깅 =========");
//        System.out.println(sb.toString());
//
//        StringTokenizer tokens = new StringTokenizer(sb.toString(), "\t");
//        while(tokens.hasMoreTokens())
//            System.out.println(tokens.nextToken());
//
//        System.out.println(UPLOAD_PATH);
//    }

}
