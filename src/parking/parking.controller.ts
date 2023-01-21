import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/api/parking')
@ApiTags('Parking')
export default class ParkingController {}
