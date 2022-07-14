"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
/* Send verification email */
const sendVerificationEmail = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transport = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "storexapi@gmail.com",
                pass: "1118964208"
            }
        });
        const mailOptions = {
            from: '"StoreX API Team" <storexapi@gmail.com>',
            to: 'mamun.swe.277@gmail.com',
            subject: 'StoreX account verification',
            text: 'Hey there, it’s our first message sent with Nodemailer ;) ',
            html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
        };
        yield transport.sendMail(mailOptions);
        return { success: true };
    }
    catch (error) {
        if (error) {
            console.log(error);
            return { success: false };
        }
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
