import { ParticipantDto } from "./tournament-participant.dto";
export interface TournamentDto {
    id: number;
    name: string;
    game: string;
    format: string;
    dateTime: string;
    description: string;
    entryFee: number;
    prizes: string;
    rules: string;
    bannerLink: string;
    status: 'Open' | 'Closed' | 'Finished';
    maxParticipants: number;
    livestreamLink: string;
    emailOrganizer: string;
    phoneOrganizer: string;
    nameOrganizer: string;
    TournamentParticipant: ParticipantDto;
}

