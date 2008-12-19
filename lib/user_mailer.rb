class UserMailer < ActionMailer::Base 
  def reg_success(user)
    @subject    = user.nick_name + '! 感谢您注册，马上激活帐户，进入I Feel Fine!'
    @recipients = user.email
    @from       = 'come2u@gmail.com'
    @sent_on    = Time.now.strftime('%Y-%m-%d %H:%M:%S')
    @body       = {"mail" => user.attributes.merge("activate_code"=>user.hex_activate_code)}
    @charset   = 'utf-8' 
  end

  def new_pwd(mail)
    @subject    = '您的密码提示！'
    @recipients = mail["login_name"]
    @from       = 'webmaster@inker.com.cn'
    @sent_on    = Time.now.strftime('%Y-%m-%d %H:%M:%S')
    @body       = {"mail" => mail}
  end
  
  def promote_email(mail)
    @subject    = '我在印客网出了自己的书《' + mail["book_name"] + '》！'
    @recipients = mail["mails"]
    @from       = 'webmaster@inker.com.cn'
    @sent_on    = Time.now.strftime('%Y-%m-%d %H:%M:%S')
    @body       = {"mail" => mail}
  end
  
  def commend_email(mail)
    @subject    = '您的朋友向您推荐《' + mail["book_name"] + '》！'
    @recipients = mail["mails"]
    @from       = 'webmaster@inker.com.cn'
    @sent_on    = Time.now.strftime('%Y-%m-%d %H:%M:%S')
    @body       = {"mail" => mail}
  end
  
  def invite_email(mail)
    @subject    = '您的朋友 ' + mail["login_name"] + ' 向您推荐印客网！'
    @recipients = mail["mails"]
    @from       = 'webmaster@inker.com.cn'
    @sent_on    = Time.now.strftime('%Y-%m-%d %H:%M:%S')
    @body       = {"mail" => mail}
  end
  
  def deny_email(mail)
    @subject = "抱歉，您的作品内容没有通过审核"
    @recipients = mail["login_name"]
    @from       = 'webmaster@inker.com.cn'
    @sent_on    = Time.now
    @body       = {"mail" => mail}
  end
  
  def cancleOrder_email(mail)
    @subject = "抱歉，您的作品订购信息审核没有通过"
    @recipients = mail["login_name"]
    @from       = 'webmaster@inker.com.cn'
    @sent_on    = Time.now
    @body       = {"mail" => mail}
  end
  
  def send_share_mail(address, subject, content)
    @subject = subject
    @charset = 'utf-8'
    @recipients = address
    @from = '印客网 <webmaster@inker.com.cn>'
    @sent_on = Time.now
    @body = content
  end
  
  def activate_mail(mail)
    @subject = mail["pen_name"] + "! 印客网邀老用户认证邮箱"
    @charset = 'utf-8'
    @recipients = mail["login_name"]
    @from = 'webmaster@inker.com.cn'
    @sent_on = Time.now
    @body = {"mail" => mail}
  end
end
