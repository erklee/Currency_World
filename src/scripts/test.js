class Example {
    constructor(ele){
        this.ele = ele;
        ele.addEventListener("click", this.handleClick.bind(this));
    }
    handleClick() {
        // console.log("clicking")
        this.ele.children[0].innerText = "ouch";
    }
}
export default Example;