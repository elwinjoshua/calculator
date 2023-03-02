let initApp = () => {
    const current_value = document.querySelector(".currentvalue");
    const previous_value = document.querySelector(".previousvalue");


    let num_flag = false;
    let itemArray = [];
    let eqArray = [];


    const input_button = document.querySelectorAll(".number");
    input_button.forEach(button => {
        button.addEventListener("click", e => {
            const new_input = button.textContent;
            if (num_flag){
                current_value.value = new_input;
                num_flag = false; 
            }else{
                current_value.value = 
                    current_value.value == 0
                        ? new_input
                        : `${current_value.value}${new_input}`;
            }
        });
    });


    const clear_buttons = document.querySelectorAll(".clear, .clearentry");
    clear_buttons.forEach(button => {
        button.addEventListener("click", e => {
            current_value.value = 0;
            if(button.classList.contains("clear")){
                previous_value.textContent="";
                itemArray = [];
            }
        });
    });


    const delete_button = document.querySelector(".backspace");
    delete_button.addEventListener("click", () => {
        current_value.value = current_value.value.slice(0, -1);
    });


    const sign_button = document.querySelector(".signchange");
    sign_button.addEventListener("click", () => {
        current_value.value = current_value.value * -1;
    });


    const op_button = document.querySelectorAll(".operator");
    op_button.forEach(button => {
        button.addEventListener("click", e => {

            if(num_flag){
                previous_value.textContent = "";
                itemArray = [];
            }

            const new_op = button.textContent;
            const current_val = parseFloat(current_value.value);

            if(!itemArray.length && current_val == 0) return;

            if(!itemArray.length){
                itemArray.push(current_val, new_op);
                previous_value.textContent = `${current_val} ${new_op}`;
                return num_flag = true;
            }

            if(itemArray.length){
                itemArray.push(current_val);

                const eqobj = {
                    num1: parseFloat(itemArray[0]),
                    num2: parseFloat(current_val),
                    op: itemArray[1]
                };

                eqArray.push(eqobj);
                const eq_string = `${eqobj["num1"]}${eqobj["op"]}${eqobj["num2"]}`

                const new_val = calculate(eq_string, current_value)
                previous_value.textContent = `${new_val} ${new_op}`
                itemArray = [new_val, new_op];
                num_flag = true;
                console.log(eqArray)
            }
        });
    });


    const eq_button = document.querySelector(".equals");
    eq_button.addEventListener("click", e => {
        const current_val = current_value.value;
        let eq_obj;

        if (!itemArray.length) {
            return current_val
        }else {
            itemArray.push(current_val);
            eq_obj = {
                num1: parseFloat(itemArray[0]),
                num2: parseFloat(current_val),
                op: itemArray[1]
            }
        }

        eqArray.push(eq_obj);

        const eq_string = `${eq_obj["num1"]} ${eq_obj["op"]} ${eq_obj["num2"]}`

        calculate(eq_string, current_value);

        previous_value.textContent = `${eq_string} =`; 

        num_flag = true;
        itemArray = [];
        console.log(eqArray);
    })

}


document.addEventListener("DOMContentLoaded", initApp);

const calculate = (equation, current_value) => {
    const regex = /([*/=])|(\s)/g;
    equation.replace(regex, "");
    const divByZero = /(\/0)/.test(equation);
    if (divByZero){
        return current_value.value = 0; 
    }return current_value.value = eval(equation);
    
}