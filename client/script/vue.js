const url = 'http://localhost:3000'

let app = new Vue ({
    el: '#app',
    mounted() {
        this.cekLogin()
        // this.listCategory()
    },
    data: {
        isLogin: false,
        userName: '',
        password: '',
        url: '',
        report: [],
        reporter: '',
        email: '',
        nohp: '',
        category: '',
        msg:'',
        toRegister: false,
        categories: []

    },
    methods: {
        doLogin: function(){
            console.log('masuk?')
            axios({
                method: 'POST',
                url: url +'/users/signin',
                data: {
                    userName: this.userName,
                    password: this.password
                }
            })
            .then(response =>{
                console.log(response);
                if(response.data){
                    localStorage.setItem('token', response.data.token)
                    this.isLogin = true
                    this.userName = ''
                    this.password = ''
                    console.log(this.isLogin);
                }
            })
            .catch(err => {
                if(err.response.status === 400){
                    this.userName = ''
                    this.password = ''
					swal({
						title: "Notice",
						text: "Wrong password",
						icon: "error",
					});
				} else if (err.response.status === 500) {
                    this.userName = ''
                    this.password = ''
					swal({
						title: "Notice",
						text: `User Not Regitered`,
						icon: "error",
					});
				} 
            })
        },

        cekLogin: function(){
            let token = localStorage.token
            if(token){
                this.isLogin = true
            } else {
                this.isLogin = false
            }
        },

        logout: function (){
            localStorage.removeItem('token')
            window.location ='/'
        },

        findUrl: function(){
            this.toRegister = false
            this.msg=''
            this.report= []
            axios({
                method: 'POST',
                url: url + `/report/url`,
                data: {
                    url: this.url
                }
            })
            .then(response =>{
                this.report.push(response.data[0])
                this.url = ''
            })
            .catch(err => {
                this.msg= `URL Not Registered!`
            }) 
        },
        
        doRegister: function(){
            console.log(`masuk pak eko`);
            this.toRegister = true
            this.msg='Form Report Link Hoax'
            this.listCategory()
        },

        listCategory: function(){
            axios({
                method: 'GET',
                url: url+ `/category`
            })
            .then(response =>{
                this.categories = response.data
                console.log(response.data);
            })
            .catch(err =>{
                console.log(err);
            })
        },

        saveReport: function(){
            axios({
                method: 'POST',
                url: url+ `/report`,
                data: {
                    url: this.url,
                    reporter: this.reporter,
                    category: this.category,
                    email: this.email,
                    nohp: this.nohp
                }
            })
            .then(response =>{
                console.log(response);
                this.url = ''
                this.reporter = ''
                this.category = ''
                this.email = ''
                this.nohp = ''
                this.msg=''
                swal("Good job!", `Succesfully report`, "success");
                this.toRegister = false
            })
            .catch(err =>{
                console.log(err);
            })
        }

    }

})

