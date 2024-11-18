
import React, { createRef } from "react";
import { Steps,Modal,Button,Input,message } from "antd";
import "./styles.css";

export default class Test05 extends React.Component{

   constructor(props) {
       super(props);
       this.state = {
           codeBtnDisabled : false,
           timeLeft:0,
           isModalOpen:true
       },
       this.timer=null
       //this.click = this.click.bind(this);
   }

   state = {

   }


   showModal = ()=>{
    this.setState({
        isModalOpen : true
    })
   }
   handleOk = () => {
        console.log('点击校验。。。');
        if (this.state.message == '1234') {
            message.success('校验成功', 2, ()=>{
                this.setState({
                    isModalOpen:false
                })
            });
;
        }else{
            message.error('校验失败，请重新输入')
        }



    };
     handleCancel = () => {
    this.setState({
        isModalOpen: false
    })
  };

  state = {
    isModalOpen : false
  }

  handleChange=(e)=>{
    this.setState({
        message: e.target.value
    }, ()=>{
        console.log(this.state.message);
    })
    console.log(this.state.message)
  }

  componentDidMount() {
    // 组件挂载后执行
    console.log('Component did mount');
  }

  componentDidUpdate(prevProps, prevState) {
    // 组件更新后执行
    console.log('Component did update');
  }

  componentWillUnmount() {
    // 清除可能存在的超时回调
    if (this.timer) {
        clearInterval(this.timer);
      }
  }

  countDown = () => {
    if (this.state.timeLeft > 0) {
      this.timer = setTimeout(() => {
        this.setState(
          (prevState) => ({ timeLeft: prevState.timeLeft - 1 }),
          this.countdown // 递归调用，继续倒计时
        );
      }, 1000);
    }
  };
  
  startCountDown = () => {
    if (this.state.timeLeft === 0) {
        this.setState({ timeLeft: 3 }); // 设置倒计时初始值
        this.timer = setInterval(() => {
          this.setState(
            (prevState) => { 
                return {timeLeft: prevState.timeLeft - 1} 
            },
            () => {
              if (this.state.timeLeft == 0) {
                clearInterval(this.timer); // 倒计时结束，清除定时器
              }
            }
          );
        }, 1000);
      }
  };

   render(){
        const {timeLeft} = this.state;
       return (<>
      <Modal title={'检测到您登录其他设备！'}  open={this.state.isModalOpen} onOk={this.handleOk} onCancel={this.handleCancel}
      closeIcon={null} maskClosable={false} cancelText='text' cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{style:{width:'140px'}}}
      >
        <div style={{display:'flex',rowGap:'15px'}}>
        <Input type="text" value={this.state.message} onChange={this.handleChange} className="inputText"></Input>
        <Button type="text" disabled={this.state.timeLeft > 0} onClick={this.startCountDown}>
            {this.state.timeLeft > 0? `请 ${timeLeft} 秒再获取 `:'点击获取验证码'}
            </Button>
        </div>
        <div style={{color:'#ff0000'}}>{this.state.timeLeft > 0 ?'验证码已发往**，请查收':''}</div>
      </Modal>
           </>);
   }
}