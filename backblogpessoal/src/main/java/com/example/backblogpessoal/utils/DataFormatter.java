package com.example.backblogpessoal.utils;

import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class DataFormatter {


    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM");

    public static String formatddmm(Date date) {
        if (date == null) return "";
        return dateFormat.format(date);
    }

}
