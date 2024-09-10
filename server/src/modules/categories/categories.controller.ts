import { Body, Controller, Delete, Get, Param, Post , Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('/api/categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) { }
    
    @Get()
    findAll() {
        return this.categoryService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id:string) {
        return this.categoryService.findById(id)
    }
    @Post()
    create(@Body() categroyDto:any) {
        return this.categoryService.create(categroyDto)
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() categoryDto: any) {
        return this.categoryService.update(id , categoryDto)
    }
    @Delete('id')
    delete(@Param('id') id: string) {
        return this.categoryService.delete(id)
    }
    }
