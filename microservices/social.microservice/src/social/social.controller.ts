import { Body, Controller, Delete, Get, Param, Post, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { UserClaims } from "src/core/decorator";
import { BuildPagination } from "src/pkg/common";
import { CreatePollDTO, CreatePostDTO, FeedLikeDTO, PaginationParams, PostVoteDTO, SearchHashtagDTO } from "src/pkg/dto";
import { claims } from "src/pkg/interfaces";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { SocialService } from "./social.service";

@Controller('social')
@ApiTags('Social Module')
@ApiBearerAuth('access-token')

export class SocialController {
    constructor(
        private social: SocialService,
    ) { }

    // Post management ...
    @Get('/get-feed')
    GetFeed(
        @Query() pagination: PaginationParams,
        @UserClaims() claims: claims,
        @Res() Response: Response,
    ) {
        pagination = BuildPagination(pagination);
        return this.social.GetAllPost({ uid: claims.userId, p: pagination, Response });
    }

    @Get('/my-post')
    GetAllPost(
        @Query() pagination: PaginationParams,
        @UserClaims() claims: claims,
        @Res() Response: Response,
    ): Promise<Response<any, Record<string, any>>> {
        pagination = BuildPagination(pagination);
        return this.social.GetAllPost({ uid: claims.userId, p: pagination, Response });
    }

    @Post('/create-post')
    CreatePost(
        @Body() payload: CreatePostDTO,
        @UserClaims() claims: claims,
        @Res() Response: Response,
    ) {
        return this.social.CreatePost(payload, claims.userId, Response);
    }

    @Get('/social-topics')
    GetSocialTopics(
        @Res() Response: Response
    ) {
        return this.social.GetSocialTopics(Response);
    }

    @Get('/search-hashtag')
    SearchHashtag(
        @Query() Query: SearchHashtagDTO,
        @Res() Response: Response,
    ): Promise<Response<any, Record<string, any>>> {
        return this.social.SearchHashtagV2(Query, Response);
    }

    @Post('/like')
    PostLike(
        @Query() Query: FeedLikeDTO,
        @UserClaims() claims: claims,
        @Res() Response: Response,
    ) {
        return this.social.PostLike(Query, claims.userId, Response);
    }

    // Follows APIs ...
    @Get('/follow-request')
    GetFollowRequest(
        @UserClaims() claims: claims,
        @Query() pagination: PaginationParams,
        @Res() Response: Response
    ) {
        pagination = BuildPagination(pagination);
        return this.social.GetFollowRequest({ uid: claims.userId, p: pagination, Response });
    }

    @Get('/follower')
    GetFollower(
        @UserClaims() claims: claims,
        @Query() pagination: PaginationParams,
        @Res() Response: Response
    ) {
        pagination = BuildPagination(pagination);
        return this.social.GetFollower({ uid: claims.userId, p: pagination, Response });
    }

    @Get('/followed')
    GetFollowed(
        @UserClaims() claims: claims,
        @Query() pagination: PaginationParams,
        @Res() Response: Response
    ) {
        pagination = BuildPagination(pagination);
        return this.social.GetFollowed({ uid: claims.userId, p: pagination, Response });
    }

    @Post('/follow-request/:fuid')
    FollowRequest(
        @UserClaims() claims: claims,
        @Param('fuid') fuid: number,
        @Res() Response: Response
    ) {
        return this.social.FollowRequest(claims.userId, fuid, Response);
    }

    @Delete('/remove-request/:frid')
    RemoveFollowRequest(
        @UserClaims() claims: claims,
        @Param('frid') frid: number,
        @Res() Response: Response
    ) {
        return this.social.RemoveFollowRequest(claims.userId, frid, Response);
    }

    @Post('/approve-follow-request/:frid')
    ApproveFollowRequest(
        @UserClaims() claims: claims,
        @Param('frid') frid: number,
        @Res() Response: Response
    ) {
        return this.social.ApproveFollowRequest(claims.userId, frid, Response);
    }

    // Poll management ...
    @Get('/my-polls')
    GetAllPoll(
        @Query() pagination: PaginationParams,
        @UserClaims() claims: claims,
        @Res() Response: Response,
    ): Promise<Response<any, Record<string, any>>> {
        pagination = BuildPagination(pagination);
        return this.social.GetAllPoll({ uid: claims.userId, p: pagination, Response });
    }

    @Post('/vote')
    PostVoteOnPoll(
        @Body() ReqBody: PostVoteDTO,
        @Res() Response: Response,
        @UserClaims() claims: claims,
    ): Promise<Response<any, Record<string, any>>> {
        return this.social.PostVoteOnPoll({ ReqBody, uid: claims.userId, Response });
    }

    @Get('/reward-history')
    GetRewardPointHistory(
        @UserClaims() claims: claims,
        @Res() Response: Response,
    ): Promise<Response<any, Record<string, any>>> {
        return this.social.GetRewardPointHistory(claims.userId, Response);
    }

    @Post('/create-poll')
    CreatePoll(
        @UserClaims() claims: claims,
        @Body() payload: CreatePollDTO,
        @Res() Response: Response
    ) {
        return this.social.CreatePoll(claims.userId, payload, Response);
    }

    @Delete('/delete-poll/:pid')
    DeletePoll(
        @UserClaims() claims: claims,
        @Param('pid') pid: number,
        @Res() Response: Response
    ) {
        return this.social.DeletePoll(claims.userId, pid, Response);
    }

    @Get('/test-notification')
    Test(
        @Res() Response: Response
    ) {
        return this.social.Test(Response);
    }
}