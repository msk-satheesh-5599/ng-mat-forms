import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgMatFormsService } from './ng-mat-forms.service';

describe('NgMatFormsService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [NgMatFormsService]
    }));

    it('should be created', () => {
        const service: NgMatFormsService = TestBed.get(NgMatFormsService);
        expect(service).toBeTruthy();
    });

    it('should have getData function', () => {
        const service: NgMatFormsService = TestBed.get(NgMatFormsService);
        expect(service.getData).toBeTruthy();
    });

    it('should have removeValidator function', () => {
        const service: NgMatFormsService = TestBed.get(NgMatFormsService);
        expect(service.getData).toBeTruthy();
    });

    it('should have setValidator function', () => {
        const service: NgMatFormsService = TestBed.get(NgMatFormsService);
        expect(service.getData).toBeTruthy();
    });
    
    it('should have setControlEnable function', () => {
        const service: NgMatFormsService = TestBed.get(NgMatFormsService);
        expect(service.getData).toBeTruthy();
    });

    it('should have setControlDisable function', () => {
        const service: NgMatFormsService = TestBed.get(NgMatFormsService);
        expect(service.getData).toBeTruthy();
    });

    it('should have replaceValue function', () => {
        const service: NgMatFormsService = TestBed.get(NgMatFormsService);
        expect(service.getData).toBeTruthy();
    });
    
    it('should have setFormValue function', () => {
        const service: NgMatFormsService = TestBed.get(NgMatFormsService);
        expect(service.getData).toBeTruthy();
    });
});
