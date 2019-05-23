import { ProfileService } from '../data/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { IProfile } from '../data/models/profile.model';
import { REGIONS } from '../data/constants/regions';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  regionList = [{ label: '', value: '' }];
  genderList = [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }];

  criteria = {
    region: "",
    gender: "",
    amt: 0
  }

  profiles: IProfile[] = [];
  namesForm: FormGroup;
  numRecordIsInvalid = true;

  constructor(private fb: FormBuilder,
    private profileService: ProfileService) {

    this.mapRegions();
  }

  ngOnInit(): void {

    this.namesForm = this.fb.group({
      regionSelected: [null],
      genderSelected: [null],
      numRecord: [null, [Validators.min(1), Validators.max(12)]],
    });
  }

  loadNamesByCriteria(criteria: any): void {
    this.profileService.getNamesByCriteria(criteria).subscribe((data: IProfile) => {
      if (!data) {
        this.profiles = [];
        return;
      }
      this.profiles.push(data);
    }, error => {
      this.profiles = [];
    });
  }

  onSubmit(): void {
    this.criteria = {
      region: this.region.value,
      gender: this.gender.value,
      amt: this.records.value
    }
    this.loadNamesByCriteria(this.criteria);
  }

  ngOnChanges(n: any): void {
    this.namesForm = this.fb.group({
      regionSelected: [null],
      genderSelected: [null],
      numRecord: [null, [Validators.min(1), Validators.max(12)]],
    });
  }

  private mapRegions(): void {
    REGIONS.forEach(region => {
      this.regionList.push({
        label: region.name,
        value: region.name.toLowerCase().trim()
      });
    });
  }

  get region(): AbstractControl { // name property
    return this.namesForm.get('regionSelected').value
  }

  get gender(): AbstractControl { // name property
    return this.namesForm.get('genderSelected').value
  }

  get records(): AbstractControl { // name property
    return this.namesForm.get('numRecord')
  }

  clearAll(): void {
    this.criteria = {
      region: "",
      gender: "",
      amt: 0
    }

    this.profiles = [];
    this.namesForm.reset();
  }
}
