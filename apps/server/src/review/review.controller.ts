import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';

import { ReviewService } from '@review/review.service';
import { JwtAuthGuard } from '@auth/auth.guard';
import { CurrentUser } from '@user/user.decorator';

@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllReviews(@Query('status') status?: string): Promise<any[]> {
    return await this.reviewService.getAllReviews(status as any);
  }

  @Put(':id/moderate')
  @UseGuards(JwtAuthGuard)
  async moderateReview(
    @Param('id') id: string,
    @Body() data: { status: string; adminResponse?: string },
  ): Promise<any> {
    return await this.reviewService.moderateReview(id, data.status as any, data.adminResponse);
  }

  @Get('product/:productId')
  async getReviews(
    @Param('productId') productId: string,
    @Query('status') status?: string,
    @Query('minRating') minRating?: number,
  ): Promise<any[]> {
    return await this.reviewService.getReviews(productId, status as any, minRating);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createReview(
    @CurrentUser() user: any,
    @Body() data: {
      productId: string;
      rating: number;
      title: string;
      comment: string;
    },
  ): Promise<any> {
    return await this.reviewService.createReview(user.id, data.productId, data.rating, data.title, data.comment);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateReview(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() data: {
      rating?: number;
      title?: string;
      comment?: string;
    },
  ): Promise<any> {
    return await this.reviewService.updateReview(user.id, id, data.rating, data.title, data.comment);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteReview(@CurrentUser() user: any, @Param('id') id: string): Promise<void> {
    await this.reviewService.deleteReview(user.id, id);
  }
}

