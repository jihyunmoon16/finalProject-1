import React, {Component} from 'react';
import ApiService from "../../ApiService";
import { useNavigate } from 'react-router-dom';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'

class UserListComponent extends Component{

    constructor(props){
        super(props);

        this.state = {
            users: [],
            message: null
        }
    }

    componentDidMount(){
        this.reloadUserList();
    }
    reloadUserList = () =>{
        ApiService.fetchUsers()
        .then(res=>{
            this.setState({
                users: res.data
            })
        })
        .catch(err=>{
            console.log('reloadUserList() Error!', err);
        })
    }
    deleteUser = (userID)=>{
        ApiService.deleteUser(userID)
        .then(res=> {
            this.setState({
                message: 'User Deleted Successfully.'
            });
            this.setState({
                users: this.state.users.filter(user=>
                    user.id !==userID)
            });
        })
        .catch(err =>{
            console.log("deleteUser() Error!",err);
        })
    }

    editUser = (ID) =>{
        window.localStorage.setItem("userID",ID);
        this.props.navigate('/edit-user');
    }

    addUser = () => {
        window.localStorage.removeItem("userID");
        this.props.navigate('/add-user');
    }
    render(){
        const {navigation} =this.props;
        return(
            <div>
                <Typography variant="h4" style={style}>User List</Typography>
                <Button variant="contained" color="primary" onClick={this.addUser}>Add User</Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Campus</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">language</TableCell>
                            <TableCell align="right">loginId</TableCell>
                            <TableCell align="right">name</TableCell>
                            <TableCell align="right">nickname</TableCell>
                            <TableCell align="right">phone</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map( user=>
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="user">{user.id}</TableCell>
                                <TableCell align="right">{user.campus}</TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">{user.language}</TableCell>
                                <TableCell align="right">{user.loginId}</TableCell>
                                <TableCell align="right">{user.name}</TableCell>
                                <TableCell align="right">{user.nickname}</TableCell>
                                <TableCell align="right">{user.phone}</TableCell>
                                <TableCell align="right" onClick={() =>this.editUser(user.id)}><CreateIcon/></TableCell>
                                <TableCell align="right" onClick={() =>this.deleteUser(user.id)}><DeleteIcon/></TableCell>
                            </TableRow>
                            )}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
const style = {
    display: 'flex',
    justifyContent: 'center'
}
export default UserListComponent;
