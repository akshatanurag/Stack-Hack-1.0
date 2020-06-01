const sgMail = require('@sendgrid/mail')

sgMail.setApiKey('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')

let sendMail = async(toEmail,token)=>{
    try {
        const msg = {
            to: `${toEmail}`,
            from: 'todo@taybill.in',
            subject: 'Verify Your Email Please!',
            text: 'and easy to do anywhere, even with Node.js',
            html: `https://stackhack-todo.herokuapp.com/api/verify/${token}`,
          };
          await sgMail.send(msg) 
    } catch (error) {
        if(error.response){
            console.log(error.response.body)
        }
    }


}
module.exports = {
    sendMail
}