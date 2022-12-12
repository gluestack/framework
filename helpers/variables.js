const variables = {};

// user's cli path
variables.cliPath = __dirname;

// setter & getter
variables.getVar = (variable) => variables[variable];
variables.setVar = (variable, data) => (variables[variable] = data);

module.exports = variables;