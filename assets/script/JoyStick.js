// var panelInitPos=cc.v2(0,0);//大圆初始位置
// var touchID;//触摸ID
// var dir= new cc.Vec3(0,0,0);//移动方向
// var angle = 0;//弧度(角度)
cc.Class({
    extends: cc.Component,

    properties: {
        panel:{
            type:cc.Node,
            default:null,
        },
        btn:{
            type:cc.Node,
            default:null,
        },
        panelWidth:{
            type:cc.Integer,
            default:0,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.panelInitPos=cc.v2(0,0);//大圆初始位置
        this.touchID;//触摸ID
        this.dir= new cc.Vec3(0,0,0);//移动方向
        this.angle = 0;//弧度(角度)
        // var moving = false; //是否正在移动
        this.moving = false; //是否正在移动

        this.panelInitPos =  new cc.Vec2(this.panel.x, this.panel.y);
    },

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    },

    stop(){
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);

        this.moving = false;
        this.enabled = false;
    },

    onTouchStart(e){
        console.log("start");
        //触摸点世界坐标转成局部坐标
        let pos = this.node.convertToNodeSpaceAR(e.getLocation());
        this.panel.setPosition(pos);
        this.btn.setPosition(0,0);
        this.touchID = e.getID();

        this.moving = false;
        this.enabled = true;
    },

    onTouchMove(e){
        console.log("move");
        if(this.touchID != e.getID()){
            return;
        }
        //小圆移动
        let posDelta = e.getDelta();
        this.btn.x += posDelta.x;
        this.btn.y += posDelta.y;
        //正在移动
        this.moving = true;
    },

    update(){
        console.log("update");
        if(this.moving){
            //将小圆限制大圆范围内
            console.log("hellow");
            let ratio = this.btn.position.mag() / this.panelWidth;
            if (ratio>1) {
                this.btn.setPosition(this.btn.position.div(ratio));
            }
            //获取向量归一化
            this.dir = this.btn.position.normalizeSelf();
            //获取弧度
            this.angle = Math.atan2(this.btn.y, this.btn.x);
        }
    },

    onTouchEnd(e){
        console.log("end");
        if(this.touchID != e.getID()){
            return;
        }
        this.panel.setPosition(this.panelInitPos);
        this.btn.setPosition(0,0);
        this.moving = false;
        this.enabled = false;
    },

    onTouchCancel(e){
        console.log("cancel");
        if(this.touchID != e.getID()){
            return;
        }
        this.panel.setPosition(this.panelInitPos);
        this.btn.setPosition(0,0);
        this.moving = false;
        this.enabled = false;
    },

    onDestroy(){
        this.stop();
    },

    // update (dt) {},
});


