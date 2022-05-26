export const state =()=>({
  token:'',
  email:'s6204062616057@email.kmutnb.ac.th',
  password:'123456789'
})

export const getters={}

export const actions={
  async getapikey(){
    const token=await axios.post('http://localhost:3004/login')
    commit(email,email)
    commit(password,password)
    return token
  }

}

export const mutations={
  getapi(state,token){
    token=state.token
  }
}
