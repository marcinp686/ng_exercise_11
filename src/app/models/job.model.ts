export interface JobModel {
  title:        string;
  description:  string;
  jobTagIds:    number[];
  id:           number;
  jobTags?:     string[];
}