// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        joyStickArea:{
            type:cc.Node,
            default:null,
        },
        role:{
            type:cc.Node,
            default:null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.speed=cc.v2(5,5);
        this.joyStick = this.joyStickArea.getComponent('JoyStick');
    },

    start () {

    },

    update (dt) {
        if(this.joyStick.moving){
        //根据角度移动
        // this.role.x += Math.cos(this.joyStick.angle)*this.speed.x;
        // this.role.y += Math.sin(this.joyStick.angle)*this.speed.y;
        //根据向量移动
        this.role.x += this.joyStick.dir.x*this.speed.x;
        this.role.y += this.joyStick.dir.y*this.speed.y;
        }
    },
});
// @ccclass
// export default class Helloworld extends cc.Component {

//     //虚拟摇杆Area
//     @property(cc.Node)
//     joyStickArea:cc.Node = null;
//     //虚拟摇杆代码
//     joyStick:JoyStick;
//     //角色
//     @property(cc.Node)
//     role:cc.Node = null;
//     //速度
//     speed:cc.Vec2 = new cc.Vec2(5,5);

//     onLoad(){
//         this.joyStick = this.joyStickArea.getComponent(JoyStick);
//     }

//     start() {
       
//     }

//     update(){
//         if(this.joyStick.moving){
//             //根据角度移动
//             // this.role.x += Math.cos(this.joyStick.angle)*this.speed.x;
//             // this.role.y += Math.sin(this.joyStick.angle)*this.speed.y;
//             //根据向量移动
//             this.role.x += this.joyStick.dir.x*this.speed.x;
//             this.role.y += this.joyStick.dir.y*this.speed.y;
//         }
//     }
// }
