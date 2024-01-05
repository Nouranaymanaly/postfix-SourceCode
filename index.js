// Stack implementation
class Stack {
    constructor() {
      this.items = [];
    }
  
    push(item) {
      this.items.push(item);
    }
  
    pop() {
      if (this.isEmpty()) {
        throw new Error("the expression is invalid");
      }
      return this.items.pop();
    }
  
    isEmpty() {
      return this.items.length == 0;
    }
  
    top() {
      if (this.isEmpty()) {
        throw new Error("Stack is empty");
      }
      return this.items[this.items.length - 1];
    }
  }
  
  // Symbol Table implementation using Hash Table
  class SymbolTable {
    constructor() {
      // Hash table with 26 slots, each initialized with [-1]
      this.hashTable = Array.from({ length: 26 }, () => [-1]);
    }
  
    insert(key, value) {
      let insertIndex = hashing(key);
  
      // If the slot is empty, insert key-value pair; otherwise, update the value
      if (this.hashTable[insertIndex][0] == -1) {
        this.hashTable[insertIndex][0] = key;
        this.hashTable[insertIndex][1] = value;
      } else {
        this.hashTable[insertIndex][1] = value;
      }
  
      console.log(this.hashTable[insertIndex][0], "=", this.hashTable[insertIndex][1]);
    }
  
    search(key) {
      let searchIndex = hashing(key);
  
      // Check if the key exists in the hash table
      if (this.hashTable[searchIndex][0] == key) {
        return this.hashTable[searchIndex][1];
      } else {
        console.log(key, " doesn't have a value")
        return null
      }
    }
  
    delete(key) {
      let deleteIndex = hashing(key);
  
      // Check if the key exists, if yes, mark it as deleted and remove it from the array
      if (this.hashTable[deleteIndex][0] == key) {
        this.hashTable[deleteIndex][0] = -1;
        this.hashTable[deleteIndex].pop();
      } else {
        console.log("Key not found in the symbol table");
        return null;
      }
    }
  }
  
  // Hashing function for letters (A-Z)
  function hashing(char) {
    let asciiChar = char.charCodeAt(0);
    let hashIndex;
  
    for (let i = 0; i <= 26; i++) {
      if (asciiChar == 65 + i) {
        hashIndex = i;
      }
    }
    
    return hashIndex;
  }
  
  // Postfix evaluation algorithm
  function evaluatePostfix(expression) {
    const stack = new Stack();
    const letterStack = new Stack();
  
    for (let i = 0; i < expression.length; i++) 
    {
      let regex = /^[A-Z]+$/;
      let token = expression[i];
  
      if (typeof token == 'number') {
        stack.push(token);
    } 
    else if (['+', '-', '*', '/', 'mod', '%', '^'].includes(token)) 
    {
        const operandtemp2 = stack.pop();
        // Check if operandtemp2 is a variable, if yes, get its value from the symbol table
        if (typeof operandtemp2 != 'number') {
            operand2 = symbolTable.search(operandtemp2);
            letterStack.pop();
        } else {
            operand2 = operandtemp2;
        }

        const operandtemp1 = stack.pop();

        // Check if operandtemp1 is a variable, if yes, get its value from the symbol table
        if (typeof operandtemp1 != 'number') {
            operand1 = symbolTable.search(operandtemp1);
            letterStack.pop();
        } else {
            operand1 = operandtemp1;
        }
        if(typeof operand1 == 'number' && typeof operand2 == 'number')
        {
            let result;

            // Perform the arithmetic operation based on the token
            switch (token) {
                case '+':
                result = operand1 + operand2;
                break;
                case '-':
                result = operand1 - operand2;
                break;
                case '*':
                result = operand1 * operand2;
                break;
                case 'mod':
                result = operand1 % operand2;
                break;
                case '%':
                result = operand1 % operand2;
                break;
                case '^':
                result = Math.pow(operand1, operand2);
                break;
                case '/':
                if (operand2 == 0) {
                    throw new Error("Division by zero");
                }
                result = operand1 / operand2;
                break;
            }

            stack.push(result);
        }
        else
        {
            var errorMessage = 'not available'
            stack.push(errorMessage);
        }
        } 
        else if (token == '=') 
        {
            // Pop variable name and value from the stack
            const value = stack.pop();
            variableName = letterStack.pop();
    
            // Insert the key-value pair into the symbol table
            symbolTable.insert(variableName, value);
    
            // Push the value back to the stack
            stack.push(value);
        } else if (regex.test(token)) {
            variableName = token;
    
            // Push variable name to letter stack and stack
            letterStack.push(token);
            stack.push(token);
        }
        }
    
        return stack.top();
        
  }
  
  // Function to split the postfix expression into tokens
  function splitExpression(expression) {
    const tokens = expression.trim().split(/\s+/);
  
    // Convert numeric strings to numbers
    const result = tokens.map(token => {
      const parsedNumber = parseFloat(token);
  
      let result;
      if (isNaN(parsedNumber)) {
        result = token;
      } else {
        result = parsedNumber;
      }
  
      return result;
    });
  
    return result;
  }

// Symbol table trial
let symbolTableTrial = new SymbolTable();
symbolTableTrial.insert("A", 4);
symbolTableTrial.insert("B", 8);
console.log("symbol table after inserting A and B: ",symbolTableTrial.hashTable);
symbolTableTrial.insert("B", 7);
console.log("symbol table after changing B: ",symbolTableTrial.hashTable);
let trial = symbolTableTrial.search("A");
console.log("searching A = ",trial);
symbolTableTrial.delete("B");
console.log("symbol table after deleting B: ", symbolTableTrial.hashTable);
symbolTableTrial.delete("A");
console.log("symbol table after deleting A: ", symbolTableTrial.hashTable);
  
// Example usage
const symbolTable = new SymbolTable();
/*" the following commented line is used if we're taking the user input from outside
the terminal but as we are using the terminal for the input we use the uncommented code " */
// var userPostfixExpression = prompt("Please enter your postfix expression: ");
// import readline module
const readline = require("readline");

// create interface for input and output
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
});

// create empty user Postfix Expression
let userPostfixExpression = "";

// question user to postfix expression
rl.question("Enter your postfix expression: ", function (string) {
    userPostfixExpression = string;
    var postfixExpression = splitExpression(userPostfixExpression);
    var result = evaluatePostfix(postfixExpression);
    console.log(userPostfixExpression, " result is ", result);
// close input stream
rl.close();
});

  