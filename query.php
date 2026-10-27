<?php
require_once ("lib/db-connect.php");

$revert = ['success' => 0, 'msg' => ''];

if (isset($_POST['T1']) && $_POST['T1'] == 'enquiry') {
    
    // Debugging: Check received values
    error_log("Received Country: " . $_POST['country_name']);
    error_log("Received Phone: " . $_POST['phone']);

    $q_getintouch = "INSERT INTO smartend_getintouch (enq_id, priority_odr, enq_name, enq_country, enq_mobile, enq_email, enq_category, enq_meet_date, enq_meet_time, enq_subject, meet_mode, skype_id, enq_city, enq_addrs, enq_message, crt_by, crt_on, status_prim, enq_remark) VALUES (:enq_id, :priority_odr, :name, :country, :mobile, :email, :category, :m_date, :m_time, :subject, :m_mode, :skype_id, :city, :address, :message, :created_by, :created_on, :status, :remark)";
    
    $r_getintouch = $dbcon->prepare($q_getintouch, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));

    
    // Get country info and phone number
    $countryName = isset($_POST['country_name']) ? trim($_POST['country_name']) : '';
    $phoneNumber = isset($_POST['phone']) ? trim($_POST['phone']) : '';

    $insert = $r_getintouch->execute(array(
        ':enq_id' => '',
        ':priority_odr' => '2',
        ':name' => isset($_POST['name']) ? $_POST['name'] : '',

        ':country' => $countryName, // Save only country name (e.g., India (भारत))
        ':mobile' => $phoneNumber, // Save only mobile number (e.g., 9876543210)

        ':email' => isset($_POST['email']) ? $_POST['email'] : '',
        ':category' => '',
        ':m_date' => '',
        ':m_time' => '',
        ':subject' => isset($_POST['subject']) ? $_POST['subject'] : 'General Enquiry',
        ':m_mode' => '',
        ':skype_id' => '',
        ':city' => '',
        ':address' => '',
        ':message' => isset($_POST['message']) ? $_POST['message'] : '',
        ':created_by' => '',
        ':created_on' => CURRENT_DATE_TIME,
        ':status' => 0,
        ':remark' => '',
    ));
    
        if ($insert) {
            
            $to_mail_arr = array();
            $to_mail_arr[0] = array('to_mail' => $_POST['email'], 'to_name' => $_POST['name']);
        
            $cc_mail_arr = array();
            // $cc_mail_arr[0] = array('cc_mail' => "info@kriscent.in", 'cc_name' => "Kapil");
            // $cc_mail_arr[1] = array('cc_mail' => "kapil@kriscent.in", 'cc_name' => "Kapil Gautam");
        
            $reply_to_mail_arr = array();
            // $reply_to_mail_arr[0] = array('from_mail' => "noreply@kriscent.in", 'from_name' => "Kriscent Techno Hub");
            
            $mail_attachment_arr = array();
        
            $from_mail_arr = array();
            $from_mail_arr[0] = array('from_mail' => "noreply@kriscent.in", 'from_name' => "KTH.com Enquiry");

			$mail_subject = "New Enquiry Recieved";
			$message = '<!DOCTYPE html>
                            <html lang="en">
                            
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Email</title>
                            </head>
                            <body style="background-color: #f9f9f9; margin: auto; padding: 0; font-family: Arial, sans-serif; width: 100%; max-width: 800px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9f9f9;">
        <tr>
            <td align="center">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="800" style="max-width: 800px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding: 24px; background-color: #ef0e0e;">
                            <img src="https://ik.imagekit.io/7kts9edz8e/Kriscent.in/logokriscent.png?updatedAt=1724488738769" alt="Kriscent Logo" width="200">
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 20px 40px; background-color: #ffffff; color: #1a1f36; font-size: 16px;">
                            <p>Hello <strong>'. $_POST['name'] .',</strong></p>
                            <p>Thank you for reaching out to <strong style="color: #ef0e0e;">Kriscent Techno Hub Pvt. Ltd.</strong> We have received your enquiry and will get back to you soon.</p>
                            <p>Kriscent Techno Hub Pvt. Ltd. is a globally leading IT company with an impressive track record creating responsive solutions to support organizational objectives.  We offer a broad range of website development solutions, application & software development and many more.</p>
                            <p style="margin-bottom: 0;">For any assistance, contact us at <strong>info@kriscent.in</strong> or call <strong>7240560001/3/4/5</strong>.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0px 40px 20px">
                            <p style="color: #666666; margin: 0; font-size: 14px;font-weight: 600;">Best Regards,</p>
                            <p style="color: #666666; margin: 0; font-size: 14px;font-weight: 600;">Support Team</p>
                            <p style="color: #ef0e0e; font-size: 18px; margin: 5px 0;"><strong>Kriscent Techno Hub Pvt. Ltd.</strong></p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 20px 0px 20px; background-color: #f5f5f5; text-align: center;">
                            <p style="color: #666666; font-size: 14px; margin: 0 0 10px;">Follow Us On</p>

                            <!-- Social Icons -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                                <tr>
                                    <td>
                                        <a href="https://www.linkedin.com/company/kriscenttechnohub/" target="_blank" style="text-decoration: none;">
                                            <img src="https://kriscent.in/assets/images/mail-images/linkedin-logo.png"
                                                alt="LinkedIn" width="16" height="16" style="margin: 5px; padding: 10px; background-color: #cccccc; border-radius: 12px;">
                                        </a>
                                        <a href="https://www.youtube.com/channel/UC_xjC_bZgHtGWwGfRN4Qnug" target="_blank" style="text-decoration: none;">
                                            <img src="https://kriscent.in/assets/images/mail-images/youtube-logo.png"
                                                alt="YouTube" width="16" height="16" style="margin: 5px; padding: 10px; background-color: #cccccc; border-radius: 12px;">
                                        </a>
                                        <a href="https://twitter.com/Kriscent_KTH" target="_blank" style="text-decoration: none;">
                                            <img src="https://ik.imagekit.io/7kts9edz8e/Kriscent.in/tempAssets/x.png?updatedAt=1739263474872"
                                                alt="Twitter" width="16" height="16" style="margin: 5px; padding: 10px; background-color: #cccccc; border-radius: 12px;">
                                        </a>
                                        <a href="https://web.facebook.com/KriscentTechnoHub?_rdc=1&_rdr" target="_blank" style="text-decoration: none;">
                                            <img src="https://kriscent.in/assets/images/mail-images/facebook-letter-logo.png"
                                                alt="Facebook" width="16" height="16" style="margin: 5px; padding: 10px; background-color: #cccccc; border-radius: 12px;">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Copyright -->
                    <tr>
                        <td align="center" bgcolor="#f5f5f5" style="padding: 10px; font-size: 12px; color: #666666;">
                            <p style="margin: 0;">&copy;
                                '.date('Y').' Kriscent.in. All rights reserved.
                            </p>
                            <p style="margin: 0;">This email was sent automatically. Please do not reply.</p>
                        </td>
                    </tr>

                    <!-- Footer Divider -->
                    <tr>
                        <td bgcolor="#ef0e0e" style="height: 5px;"></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
                            
                        </html>';
			$mail_attachment_arr = array();
			
			send_mail($to_mail_arr, $cc_mail_arr, $reply_to_mail_arr, $mail_subject, $message, $mail_attachment_arr, $from_mail_arr);
		
			$revert['success'] = 1;
			$revert['msg'] = "Your message has been received. We will get back to you soon.";
		} 
		else {
			$revert['success'] = 0;
			$revert['msg'] = "Something went wrong!";
		}
		
		$to_mail_arr = array();
        $to_mail_arr[0] = array('to_mail' => "info@kriscent.in", 'to_name' => 'KTH.com Enquiry');
        
        $cc_mail_arr = array();
        $cc_mail_arr[0] = array('cc_mail' => "kapil@kriscent.in", 'cc_name' => "Kapil Gautam");
    
        $reply_to_mail_arr = array();
        
        $mail_attachment_arr = array();
    
        $from_mail_arr = array();
        $from_mail_arr[0] = array('from_mail' => "noreply@kriscent.in", 'from_name' => "KTH.com Enquiry");
		preg_match('/\+\d+/', $countryName, $matches);
		
	        $mail_subject = "New Enquiry Received";
	        
	        $message = '<!DOCTYPE html>
                            <html lang="en">
                            
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>New Enquiry Received</title>
                            </head>
                            <body style="background-color: #f9f9f9; margin: auto; padding: 0; font-family: Arial, sans-serif; width: 100%; max-width: 800px;">

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f9f9f9">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" max-width="600px" cellspacing="0" cellpadding="0" border="0"
                    bgcolor="#ffffff" style="margin: 0px auto; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td align="center" bgcolor="#ef0e0e" style="padding: 24px;">
                            <img src="https://ik.imagekit.io/7kts9edz8e/Kriscent.in/logokriscent.png?updatedAt=1724488738769"
                                alt="Kriscent Logo" width="200" style="display: block; max-width: 100%;">
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding:18px; font-size: 16px; color: #1a1f36;">
                            <p>Hello Admin,</p>
                            <p>A new <strong style="color: #ed3237; font-weight: 600;light">General Enquiry</strong> has been submitted through the <strong style="color: #ed3237; font-weight: 600;">Contact Page</strong> on www.kriscent.com.</p>

                            <!-- Enquiry Box -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
                                bgcolor="#f8fafc" style="border-radius: 8px; padding: 20px; margin: 0px 0;">
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;"><strong>Date &
                                        Time:</strong>
                                        '.date("d-m-Y h:i:s a").'
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                                        <strong>Name: </strong> 
                                        Mr./Ms. '.$_POST['name'].'
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                                        <strong>Mobile:</strong>
                                         '.$matches[0].'-'.$_POST['phone'].'
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                                        <strong>Email:</strong>
                                        '.$_POST['email'].'
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                                        <strong>Subject: </strong> General Enquiry</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;"><strong>Message: </strong> 
                                        '.$_POST['message'].'
                                    </td>
                                </tr>
                            </table>

                            <p>Please review and respond accordingly.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0px 20px 20px">
                            <p style="color: #666666; margin: 0; font-size: 14px;font-weight: 600;">Best Regards,</p>
                            <p style="color: #666666; margin: 0; font-size: 14px;font-weight: 600;">Support Team</p>
                            <p style="color: #ef0e0e; font-size: 18px; margin: 5px 0;"><strong>Kriscent Techno Hub Pvt. Ltd.</strong></p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    
                    <tr>
                        <td style="padding: 20px 20px 0px 20px; background-color: #f5f5f5; text-align: center;">
                            <p style="color: #666666; font-size: 14px; margin: 0 0 10px;">Follow Us On</p>

                            <!-- Social Icons -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                                <tr>
                                    <td>
                                        <a href="https://www.linkedin.com/company/kriscenttechnohub/" target="_blank" style="text-decoration: none;">
                                            <img src="https://kriscent.in/assets/images/mail-images/linkedin-logo.png"
                                                alt="LinkedIn" width="16" height="16" style="margin: 5px; padding: 10px; background-color: #cccccc; border-radius: 12px;">
                                        </a>
                                        <a href="https://www.youtube.com/channel/UC_xjC_bZgHtGWwGfRN4Qnug" target="_blank" style="text-decoration: none;">
                                            <img src="https://kriscent.in/assets/images/mail-images/youtube-logo.png"
                                                alt="YouTube" width="16" height="16" style="margin: 5px; padding: 10px; background-color: #cccccc; border-radius: 12px;">
                                        </a>
                                        <a href="https://twitter.com/Kriscent_KTH" target="_blank" style="text-decoration: none;">
                                            <img src="https://ik.imagekit.io/7kts9edz8e/Kriscent.in/tempAssets/x.png?updatedAt=1739263474872"
                                                alt="Twitter" width="16" height="16" style="margin: 5px; padding: 10px; background-color: #cccccc; border-radius: 12px;">
                                        </a>
                                        <a href="https://web.facebook.com/KriscentTechnoHub?_rdc=1&_rdr" target="_blank" style="text-decoration: none;">
                                            <img src="https://kriscent.in/assets/images/mail-images/facebook-letter-logo.png"
                                                alt="Facebook" width="16" height="16" style="margin: 5px; padding: 10px; background-color: #cccccc; border-radius: 12px;">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Copyright -->
                    <tr>
                        <td align="center" bgcolor="#f5f5f5" style="padding: 10px; font-size: 12px; color: #666666;">
                            <p style="margin: 0;">&copy;
                                '.date('Y').' Kriscent.in. All rights reserved.
                            </p>
                            <p style="margin: 0;">This email was sent automatically. Please do not reply.</p>
                        </td>
                    </tr>

                    <!-- Footer Divider -->
                    <tr>
                        <td bgcolor="#ef0e0e" style="height: 5px;"></td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
                            
                            
                            
                            </html>';
			
			$mail_attachment_arr = array();
			
			send_mail($to_mail_arr, $cc_mail_arr, $reply_to_mail_arr, $mail_subject, $message, $mail_attachment_arr, $from_mail_arr);	
}

echo json_encode($revert);
?>
