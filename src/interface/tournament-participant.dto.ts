export type ParticipantDto = {
    fullName: string;
    email: string;
    phone: string;
    userName: string;
    userId: string;
    age: number;
    platform: string;
    isPaid: boolean;
}

export type RegisterParticipantDto = {
    tournamentId: number;
    participantData: ParticipantDto;
}
