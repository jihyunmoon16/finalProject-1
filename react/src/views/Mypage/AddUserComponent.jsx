import React, {Component} from 'react';
import ApiService from "../../ApiService";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';




class AddUserComponent extends Component{

    constructor(props){
        super(props);

        this.state ={
            id: '',
            campus: '',
            email: '',
            language: '',
            loginId: '',
            name: '',
            nickname: '',
            phone:''
        }
    }
    OnChage = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    saveUser = (e) => {
        e.preventDefault();

        let user = {
            id: this.state.id,
            campus: this.state.campus,
            email: this.state.email,
            language: this.state.language,
            loginid: this.state.loginid,
            name: this.state.name,
            nickname: this.state.nickname,
            phone: this.state.phone

        }

        ApiService.addUser(user)
        .then( res =>{
            this.setState({
                message: user.nickname + '님이 성공적으로 등록되었습니다.'
            })
            console.log(this.state.message);
            this.props.history.push('/users');
        })
        .catch( err =>{
            console.log('saveUser() 에러',err);
        });
    }

    render(){
        return(
            <div>
                <Typography variant="h4" style={style}>Add User</Typography>
                <form style={formContainer}>
                    
                    <TextField type="text" placeholder= "please input your id" name="id"
                    fullWidth margin="normal" value={this.state.id} onChange={this.onChange} />

                    <TextField type="password" placeholder= "please input your campus" name="campus"
                    fullWidth margin="normal" value={this.state.campus} onChange={this.onChange} />

                    <TextField placeholder="please input your email" name="email"
                    fullWidth margin="normal" value={this.state.email} onChange={this.onChange}/>
                    
                    <TextField placeholder="please input your language" name="language"
                    fullWidth margin="normal" value={this.state.language} onChange={this.onChange}/>
                
                    <TextField type ="number" placeholder="please input your loginId" name="loginId"
                    fullWidth margin="normal" value={this.state.loginId} onChange={this.onChange}/>

                    <TextField type ="number" placeholder="please input your name" name="name"
                    fullWidth margin="normal"value={this.state.name} onChange={this.onChange}/>
                    
                    <TextField type ="number" placeholder="please input your nickname" name="nickname"
                    fullWidth margin="normal"value={this.state.nickname} onChange={this.onChange}/>

                    <TextField type ="number" placeholder="please input your phone" name="phone"
                    fullWidth margin="normal"value={this.state.phone} onChange={this.onChange}/>

                    <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
                </form>
            </div>
        );
    }
}
const formContainer ={
display: 'flex',
flexFlow: 'row wrap'
}
const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default AddUserComponent