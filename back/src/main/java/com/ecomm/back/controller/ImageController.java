package com.ecomm.back.controller;

import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/image")
public class ImageController {

    String UPLOAD_PATH = System.getProperty("user.home") + System.getProperty("file.separator") + "images" + System.getProperty("file.separator");

    @GetMapping(value = "", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> userSearch(@RequestParam("name") String imageName) throws IOException {
        InputStream imageStream = new FileInputStream(UPLOAD_PATH + imageName);
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();
        return new ResponseEntity<byte[]>(imageByteArray, HttpStatus.OK);
    }

    @PostMapping("/upload")
    private ResponseEntity<String> upload(@RequestPart(value="file") List<MultipartFile> files) {

        // 시간과 originalFilename으로 매핑 시켜서 src 주소를 만들어 낸다.
        Date date = new Date();
        StringBuilder allImage = new StringBuilder();
        StringBuilder name = new StringBuilder();

        try {
            for (MultipartFile file : files) {
                name.append(date.getTime()).append(file.getOriginalFilename().replace(" ", ""));
                File fileSave = new File(UPLOAD_PATH + name.toString()); // ex) fileId.jpg
                if (!fileSave.exists()) { // 폴더가 없을 경우 폴더 만들기
                    fileSave.mkdirs();
                }
                file.transferTo(fileSave); // fileSave의 형태로 파일 저장
                allImage.append(name.toString()).append("\t");
                name.setLength(0);
            }
        } catch(IOException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<String>(allImage.toString(), HttpStatus.OK);
    }

    @PostMapping("/delete")
    private ResponseEntity<String> delete(@RequestParam(value="exImgFile") List<String> exImgFile,
                                          @RequestParam(value="deletedFile", required = false) List<String> deletedFile) {

        List<String> imageList = exImgFile;
        StringBuilder allImage = new StringBuilder();

        if(deletedFile == null) {
            for(String name : imageList) {
                allImage.append(name).append("\t");
            }
        }
        else {
            try {
                for (String name : deletedFile) {
                    String path = UPLOAD_PATH + name;
                    System.out.println(path);
                    File file = new File(path); // file 생성

                    if (file.delete()) { // f.delete 파일 삭제에 성공하면 true, 실패하면 false
                        System.out.println("파일을 삭제하였습니다");
                    } else {
                        System.out.println("파일 삭제에 실패하였습니다");
                    }
                }
                if (imageList.size() == 0) {
                    allImage.append("");
                } else {
                    for (String name : imageList) {
                        allImage.append(name).append("\t");
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return new ResponseEntity<String>(allImage.toString(), HttpStatus.OK);
    }


}
