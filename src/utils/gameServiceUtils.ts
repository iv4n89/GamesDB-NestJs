import { CreateGameDto } from "src/game/dto/create-game.dto"


export const getGameCreatedRelations = (createGameDto: CreateGameDto): Array<string> => {
    const relations = [] as Array<string>;
    if (createGameDto?.developer) relations.push('developer');
    if (createGameDto?.publisher) relations.push('publisher');
    if (createGameDto?.zone) relations.push('zone');
    if (createGameDto?.tags) relations.push('tags');
    if (createGameDto?.genres) relations.push('genres');
    if (createGameDto?.price) relations.push('price');

    return relations;
}