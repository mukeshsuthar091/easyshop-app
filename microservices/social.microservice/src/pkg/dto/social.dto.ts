import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

// export class SearchHashtagDTO {
//     @IsNotEmpty()
//     @IsString()
//     @MinLength(3)
//     term: string;
// }

export class PostVoteDTO {
    @IsNotEmpty()
    pollId: number;

    @IsNotEmpty()
    optionIds: number[];
}

export class CreatePollDTO {
    @IsNotEmpty()
    question: string;

    @IsArray()
    options: string[];

    @IsNotEmpty()
    privacy: string;

    @IsNotEmpty()
    expiry: string;

    @IsBoolean()
    multiple_select: boolean;

    @IsNotEmpty()
    productId: number;
}

export class SearchHashtagDTO {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    term: string;

    @IsOptional()
    limit: number;

    @IsOptional()
    page: number;
}

export class CreatePostDTO {

    @IsNotEmpty()
    title: string;

    @IsOptional()
    description: string;

    @IsNotEmpty()
    socialTopicId: number;

    @IsOptional()
    @IsArray()
    hashtags: string[];
}

export class FeedLikeDTO {

    @IsNotEmpty()
    postId: number;
}