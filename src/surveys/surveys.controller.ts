import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { SurveysService } from './surveys.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { SurveyDto } from './dto/get-survey.dto';
import { CreateSurveyQuestionDto } from './dto/create-survey-question.dto';
import { CreateSurveyAnswerOptionDto } from './dto/create-survey-answer-option.dto';
import { CreateSurveyResultDto } from './dto/create-survey-result.dto';
import { CreateScoringThresholdDto } from './dto/create-scoring-threshold.dto';
import { CreateSurveyUserAnswerDto } from './dto/create-survey-user-answer.dto';
import { SurveyResultDto } from './dto/survey-results.dto';

@ApiTags('Surveys')
@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  @ApiOperation({ summary: 'Создать опрос' })
  @ApiBody({ type: CreateSurveyDto })
  @ApiResponse({ status: 201, type: SurveyDto })
  async create(@Body() createSurveyDto: CreateSurveyDto) {
    return await this.surveysService.createSurveyWithQuestions(createSurveyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все опросы' })
  @ApiResponse({ status: 200, type: [SurveyDto] })
  async findAll() {
    return await this.surveysService.getAllSurveys();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить опрос по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: SurveyDto })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.surveysService.getSurveyById(id);
  }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Обновить опрос' })
  // @ApiParam({ name: 'id', type: Number })
  // @ApiBody({ type: UpdateSurveyDto })
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateSurveyDto: UpdateSurveyDto,
  // ) {
  //   return await this.surveysService.updateSurvey(id, updateSurveyDto);
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить опрос' })
  @ApiParam({ name: 'id', type: Number })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.surveysService.deleteSurvey(id);
  }

  @Post(':id/questions')
  @ApiOperation({ summary: 'Добавить вопрос к опросу' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateSurveyQuestionDto })
  async createQuestion(
    @Param('id', ParseIntPipe) surveyId: number,
    @Body() createQuestionDto: CreateSurveyQuestionDto,
  ) {
    return await this.surveysService.createQuestion(
      surveyId,
      createQuestionDto,
    );
  }

  @Post(':surveyId/questions/:questionId/answer-options')
  @ApiOperation({ summary: 'Добавить вариант ответа к вопросу' })
  @ApiParam({ name: 'surveyId', type: Number })
  @ApiParam({ name: 'questionId', type: Number })
  @ApiBody({ type: CreateSurveyAnswerOptionDto })
  async createAnswerOption(
    @Param('surveyId', ParseIntPipe) surveyId: number,
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() createAnswerOptionDto: CreateSurveyAnswerOptionDto,
  ) {
    return await this.surveysService.createAnswerOption(
      questionId,
      createAnswerOptionDto,
    );
  }

  @Post(':surveyId/results/:resultId/answers')
  @ApiOperation({ summary: 'Сохранить ответ пользователя на вопрос' })
  @ApiParam({ name: 'surveyId', type: Number })
  @ApiParam({ name: 'resultId', type: Number })
  @ApiBody({ type: CreateSurveyUserAnswerDto })
  async saveUserAnswer(
    @Param('surveyId', ParseIntPipe) surveyId: number,
    @Param('resultId', ParseIntPipe) resultId: number,
    @Body() createUserAnswerDto: CreateSurveyUserAnswerDto,
  ) {
    return await this.surveysService.saveUserAnswer(createUserAnswerDto);
  }

  @Post(':surveyId/results')
  @ApiOperation({ summary: 'Создать результат прохождения опроса' })
  @ApiParam({ name: 'surveyId', type: Number })
  @ApiBody({ type: CreateSurveyResultDto })
  async createSurveyResult(
    @Param('surveyId', ParseIntPipe) surveyId: number,
    @Body() createSurveyResultDto: CreateSurveyResultDto,
  ) {
    return await this.surveysService.createSurveyResult(createSurveyResultDto);
  }

  @Post(':id/thresholds')
  @ApiOperation({ summary: 'Добавить шкалу интерпретации результата' })
  @ApiParam({ name: 'id', description: 'ID опроса', type: Number })
  @ApiBody({
    type: CreateScoringThresholdDto,
    description: 'Граница баллов и её текстовая интерпретация',
  })
  async createScoringThreshold(
    @Param('id', ParseIntPipe) surveyId: number,
    @Body() createScoringThresholdDto: CreateScoringThresholdDto,
  ) {
    return await this.surveysService.createScoringThreshold(
      surveyId,
      createScoringThresholdDto,
    );
  }

  @Get(':surveyId/results/user/:userId')
  @ApiOperation({ summary: 'Получить результаты опроса по пользователю' })
  @ApiParam({ name: 'surveyId', type: Number })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, type: [SurveyResultDto] })
  async getUserSurveyResults(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('surveyId', ParseIntPipe) surveyId?: number,
  ) {
    return await this.surveysService.getUserSurveyResults(userId, surveyId);
  }
}
