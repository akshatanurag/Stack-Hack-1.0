const sgMail = require('@sendgrid/mail')

sgMail.setApiKey('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')

let sendMail = async(toEmail,token)=>{
    try {
        const msg = {
            to: `${toEmail}`,
            from: 'todo@taybill.in',
            subject: 'Verify Your Email Please!',
            text: 'and easy to do anywhere, even with Node.js',
            html: `https://stackhack-todo.herokuapp.com/api/verify/?token=${token}`,
          };
          await sgMail.send(msg)
          return true; 
    } catch (error) {
        if(error.response){
            console.log(error.response.body)
        }
        return false
    }


}
module.exports = {
    sendMail
}