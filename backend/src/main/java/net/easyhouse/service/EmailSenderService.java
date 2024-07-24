package net.easyhouse.service;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailSenderService {
 @Autowired
 private JavaMailSender mailSender;

 public void sendEmail(String toEmail, String subject, String body) {
	 MimeMessage mimeMessage = mailSender.createMimeMessage();
	    try {
	        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
	        helper.setFrom(new InternetAddress("vaishnavikothari4201@gmail.com", "Easyhouse Solutions"));
	        helper.setTo(toEmail);
	        helper.setSubject(subject);
	        helper.setText(body);

	        mailSender.send(mimeMessage);

	        System.out.println("Mail sent successfully...");
	    } catch (MessagingException | UnsupportedEncodingException e) {
	        e.printStackTrace(); // Or handle the exception appropriately
     }
	 	 
//     SimpleMailMessage message = new SimpleMailMessage();
//     message.setFrom("20102036.anupama.menon@gmail.com");
//     message.setTo(toEmail);
//     message.setText(body);
//     message.setSubject(subject);
//     
//     mailSender.send(message);
//     
//     System.out.println("Mail sent successfully...");
 }
}