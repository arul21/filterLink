const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sgMail = require('@sendgrid/mail')

const reportSchema = new Schema({
    title: String,
    url: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    reporter: {
        type: String
    },
    email: {
        type: String
    },
    nohp: {
        type: String
    },
    status: {
        type: String,
        default: 'unverified'
    },
    deleteAt: {
        type: Date,
        default: null
    },
}, {
    timestamps: true
});
reportSchema.post('save', function() {
    sgMail.setApiKey(process.env.SENDGRID)
        const msg = {
        to: this.email,
        from: 'aruldjaduls@gmail.com',
        subject: 'Thanks for report URL',
        text: `Thanks for report URL `,
        html: `<p>Hello ${this.reporter}, Thanks for report, Kami akan mengecek url untuk verifikasi content negative</p>`
    }
    sgMail.send(msg)
    console.log(`ini model`,msg);
    
})


const Report = mongoose.model("Report", reportSchema);

module.exports = Report;