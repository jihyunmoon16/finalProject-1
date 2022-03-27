import React, {Component} from 'react';
import ApiService from "../../ApiService";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class EditUserComponent extends Component{

    constructor(props){
        super(props);

        this.state = {
            id: '',
            campus: '',
            email: '',
            language: '',
            loginId: '',
            name: '',
            nickname:'',
            phone:'',
            message: null
        }
    }

    componentDidMount(){
        this.loadUser();
    }

    loadUser =() =>{
        ApiService.fetchUserByID(window.localStorage.getItem("userID"))
        .then(res =>{
            let user = res.data;
            this.setState({
                id:user.id,
                campus: user.campus,
                email: user.email,
                language: user.language,
                loginId: user.loginId,
                name: user.name,
                nickname: user.nickname,
                phone: user.phone
            })
        })
        .catch(err =>{
            console.log('loadUser() 에러', err);
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.tartget.value
        });
    }

    saveUser = (e)=>{
        e.preventDefault();

        let user = {
            id: this.state.id,
            campus: this.state.campus,
            email: this.state.email,
            language: this.state.language,
            loginId: this.state.loginId,
            name: this.state.name,
            nickname: this.state.nickname,
            phone: this.state.phone
        }

        ApiService.editUser(user)
        .then( res=>{
            this.setState({
                message : user.nickname + '님 정보가 수정되었습니다.'
            })
            this.props.history.push('/users');
        })
        .catch(err =>{
            console.log('saveUser() 에러',err);
        })
    }
    render(){
        return(
            <div>
                <Typography variant="h4" style={style}>Edit User</Typography>
                <form>
                    <Typography type="text" name="id" readOnly={true}
                    fullWidth margin="normal" value={this.state.id}/>
                    
                    <Typography placeholder="Edit your campus" name="campus"
                    fullWidth margin="normal" value={this.state.campus} onChange={this.onChange}/>
                    
                    <Typography placeholder="Edit your email" name="email"
                    fullWidth margin="normal" value={this.state.email} onChange={this.onChange}/>
                        
                    <Typography placeholder="Edit your language" name="language" 
                    fullWidth margin="normal" value={this.state.language} onChange={this.onChange}/>
                    
                    <Typography placeholder="Edit your loginId" name="loginId" 
                    fullWidth margin="normal" value={this.state.loginId} onChange={this.onChange}/>
                    
                    <Typography type="text" placeholder="Edit your name" name="name" 
                    fullWidth margin="normal" value={this.state.name} onChange={this.onChange}/>

                    <Typography placeholder="Edit your nickname" name="nickname"
                    fullWidth margin="normal" value={this.state.nickname} onChange={this.onChange}/>
                    
                    <Typography type="number" placeholder="Edit your phone number" name="phone"
                    fullWidth margin="normal" value={this.state.phone} onChange={this.onChange}/>

                    <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
                </form>
            </div>
        );
    }

}
const style = {
    display: 'flex',
    justifyContent: 'center'
}
export default EditUserComponent;