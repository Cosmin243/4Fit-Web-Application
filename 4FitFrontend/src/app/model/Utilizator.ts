export interface Utilizator {
  id: number;
  keycloakId: string;
  rol: string;
  nume: string;
  prenume: string;
  email: string;
  sold?: number;
  status?: string;
  pozaProfil?: string;
  abonat?: boolean;
  adminSauManager?: boolean;
  abonamenteActive?: Abonament[];
  inscrieriActive?: InscriereClasa[];
  tipuriAbonamente?: TipAbonament[];
}

export interface TipAbonament {
  id: number;
  nume: string;
  accesFitness: boolean;
  accesInot: boolean;
  sedinteAntrenor: number;
  sedinteClase: number;
  pret: number;
}

export interface Abonament {
  id: number;
  tipAbonament: string;
  dataStart: string;
  dataEnd: string;
  sedinteClaseRamase: number;
  sedinteAntrenorRamase: number;
  activ: boolean;
}

export interface Clasa {
  id: number;
  nume: string;
  tipClasa: string;
  antrenor: string;
  sala: string;
  dataOra: string;
  durataMinute: number;
  maxParticipanti: number;
  participantiInscrisi: number;
  activa: boolean;
  inscris: boolean;
  imagineUrl?: string;
}

export interface TipClasa {
  id: number;
  nume: string;
}

export interface CreateClasaRequest {
  nume: string;
  tipClasaId: number;
  antrenorId: number;
  dataOra: string;
  durataMinute: number;
  maxParticipanti: number;
}

export interface InscriereClasa {
  id: number;
  clasaId: number;
  clasaNume: string;
  sala: string;
  antrenor: string;
  dataOra: string;
  status: string;
}

export interface Antrenor {
  id: number;
  nume: string;
  prenume: string;
  specialitate: string;
  activ: boolean;
}
