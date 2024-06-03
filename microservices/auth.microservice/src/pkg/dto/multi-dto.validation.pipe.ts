import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { md } from './multi-dto.decorator';

@Injectable()
export class MultiDtoValidationPipe implements PipeTransform<any> {
  constructor(private readonly dtos: any[]) {}
    
  formatValidationErrors(errors: ValidationError[], parentProperty = ''): Record<string, string[]> {
    const formattedErrors: Record<string, string[]> = {};

    for (const error of errors) {
      const property = error.property;
      const constraints = error.constraints;
      const children = error.children;
      const currentProperty = parentProperty ? `${parentProperty}.${property}` : property;
      if (constraints) {
        formattedErrors[currentProperty] = Object.values(constraints);
      }
      if (children && children.length > 0) {
        const nestedErrors = this.formatValidationErrors(children, currentProperty);
        Object.entries(nestedErrors).forEach(([nestedProperty, nestedMessages]) => {
          if (!formattedErrors[nestedProperty]) {
            formattedErrors[nestedProperty] = [];
          }
          formattedErrors[nestedProperty] = formattedErrors[nestedProperty].concat(nestedMessages);
        });
      }
    }

    return formattedErrors;
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    let errors = [];
    let validDtoFound = false;

    for (const dto of this.dtos) {
      const mdType = md.getTypeFieldValue(dto.prototype);
      const { [mdType.propertyKey]: payload_type, ...payload } = value;

      if (mdType.value === payload_type) {
        validDtoFound = true;

        const object = plainToInstance(dto, payload);
        errors = await validate(object, {
          whitelist: true,
          forbidNonWhitelisted: true,
        });

        if (errors.length === 0) {
          return value;
        }
        break;
      }
    }

    if (!validDtoFound) {
      throw new BadRequestException('No valid DTO found');
    }

    throw new BadRequestException({ message: this.formatValidationErrors(errors) });
  }
}
