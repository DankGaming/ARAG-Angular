export interface SubmitFormDTO {
    answers: {
        [question: number]: number;
    };

    form: {
        [key: string]: any;
    };

    attachments: {
        [name: string]: File;
    };
}
