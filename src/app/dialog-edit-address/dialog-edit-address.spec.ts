import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditAddress } from './dialog-edit-address';

describe('DialogEditAddress', () => {
  let component: DialogEditAddress;
  let fixture: ComponentFixture<DialogEditAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditAddress],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogEditAddress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
