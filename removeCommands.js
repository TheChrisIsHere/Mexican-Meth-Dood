require('dotenv').config();

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

    
const rest = new REST({ version: '9' }).setToken(process.env.token);
rest.get(Routes.applicationGuildCommands("938351107439202304", "949542963963392001"))
    .then(data => {
        const promises = [];
        for (const command of data) {
            const deleteUrl = `${Routes.applicationGuildCommands("938351107439202304", "949542963963392001")}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
    });
