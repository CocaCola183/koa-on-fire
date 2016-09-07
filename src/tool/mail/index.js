import mailer from 'nodemailer';
import options from './config.json';

function send (mail, callback) {
	// let mail = {
	// 	from: '',
	// 	to: '',
	// 	subject: '',
	// 	text: ''
	// };
	const transporter = mailer.createTransport(options);
	transporter.sendMail(mail, callback);
}