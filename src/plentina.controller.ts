import { Controller, Get } from "@nestjs/common";
import { PlentinaService } from "./plentina.service";

@Controller('healthCheck') 
export class PlentinaController {
    constructor (public appService: PlentinaService) {}
    
    @Get() 
    healthCheck(): string {
        return this.appService.healthCheck();
    }
}