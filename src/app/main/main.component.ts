import { ProfileService } from '../data/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { IProfile } from '../data/models/profile.model';
import { REGIONS } from '../data/constants/regions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  regionList = [{ label: '', value: '' }];
  regionSelected = { label: '', value: '' };

  regionListAlt: any;

  genderList = [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }];
  genderSelected = { label: '', value: '' };

  selectedRegion = 'albania';
  selectedGender = 'male';
  numRecord = 1;
  recordsNeeded = 1;

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


  }

  ngOnInit(): void {

    this.namesForm = this.fb.group({
      numRecord: [null, [Validators.min(1), Validators.max(12)]],
    });

    this.mapRegions();
  }

  private mapRegions(): void {
    REGIONS.forEach(region => {
      this.regionList.push({
        label: region.name,
        value: region.name.toLowerCase().trim()
      });
    });
  }

  setRegion(r: { label: string; value: string; }): void {
    this.selectedRegion = r.value;
  }

  setGender(g: { label: string; value: string; }): void {
    this.selectedGender = g.value;
  }

  setNumRecords(n: number): void {

    this.namesForm.patchValue({
      numRecord: n
    });

    this.namesForm = this.fb.group({
      numRecord: [null, [Validators.min(1), Validators.max(12)]],
    });
    this.recordsNeeded = n;
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

    this.namesForm.reset();
  }

  onSubmit(): void {

    if (this.namesForm.valid) {
      this.criteria = {
        region: this.selectedRegion,
        gender: this.selectedGender,
        amt: this.recordsNeeded
      }
      this.loadNamesByCriteria(this.criteria);
    }
  }

  clearAll(): void {
    this.criteria = {
      region: "",
      gender: "",
      amt: 0
    }

    this.selectedRegion = '';
    this.selectedGender = '';
    this.numRecord = 0;

    this.profiles = [];
  }
}
