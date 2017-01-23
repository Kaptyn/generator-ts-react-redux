"use strict"

var Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.webTitle = "";
    }

    prompts() {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Web App Title',
            default: this.appname // Default to current folder name
        }, {
            type: 'list',
            name: 'type',
            message: 'Choose React rendering type.',
            choices: ["Client", "Client + Server"]
        }]).then((answers) => {
            this.webTitle = answers.name;
            this.type = answers.type == "Client" ? "client" : "server";
        })
    }


    copyBaseContent() {

        this.fs.copyTpl(
            this.templatePath('./base'),
            this.destinationPath('.'),
            { title: this.webTitle }
        )
    }

    copyOtherContent() {
        let projectType = this.type;

        console.log("Adding " + this.type + " redering");

        this.fs.copyTpl(
            this.templatePath('./' + projectType),
            this.destinationPath('.'),
            { title: this.webTitle }
        )
    }

    installDeps() {

        this.installDependencies({
            bower: false,
            npm: true,
            callback: function(){
                this.emit('dependenciesInstalled')
                this.spawnCommandSync('gulp', ['build']);
            }.bind(this)
        });
    }

    end() {
        console.log("To get started, run 'npm start' ");
    }

};