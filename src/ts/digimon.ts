export type digimonData = {
    pageable: {
        currentPage?: number;
        elementsOnPage?: number;
        nextPage?: string;
        previousPage?: string;
        totalElements: number;
        totalPages?: number;
    };
};

export type evolutions = {
    digimon: string;
    image: string;
};

export type digimons = {
    id: number;
    name: string;
    descriptions: {
        forEach(arg0: (data: {
            language: string;
            description: string;
        }) => void): string[]
    };
    images: {
        [0]: {
            href: string;
            transparent: boolean;
        };
    };
    nextEvolutions: {
        length: number;
        map(arg0: (data: {
            digimon: string;
            image: string;
        }) => void): string[];
    };
    priorEvolutions: {
        length: number;
        map(arg0: (data: {
            digimon: string;
            image: string;
        }) => void): string[];
    };
    types: {
        length: number;
        forEach(arg0: (data: {
            type: string;
        }) => void): string[];
    };
};