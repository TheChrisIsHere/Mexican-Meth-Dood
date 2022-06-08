module.exports = {
    name: "interactionCreate",
    run: async (client, interaction) => {
        
        if (!interaction.isCommand()) return;

        const command = client.slashCommands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}