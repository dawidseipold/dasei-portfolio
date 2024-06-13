import { createBucketClient } from "@cosmicjs/sdk";

export interface ProjectPreviewData {
  title: string;
  slug: string;
  metadata: {
    cover: {
      url: string;
      imgix_url: string;
    };
    tags: string[];
    description: string;
  };
}

export interface ProjectData {
  title: string;
  slug: string;
  metadata: {
    cover: {
      url: string;
      imgix_url: string;
    };
    repo: string;
    link: string;
    overview: string;
    solution: string;
    results: string;
    tags: string[];
    description: string;
  };
}

interface SubSkill {
  title: string;
  slug: string;
  metadata: {
    website: string;
  };
}

interface SkillData {
  title: string;
  slug: string;
  metadata: {
    description: string;
    website: string;
    subskills: SubSkill[];
  };
}

interface Role {
  metadata: {
    role_title: string;
    description: string;
    date: {
      start: string;
      end: string;
    };
  };
}

interface JobData {
  metadata: {
    job_title: string;
    company: string;
    company_slug: string;
    company_website: string;
    location: string;
    roles: Role[];
  };
}

const cosmic = createBucketClient({
  bucketSlug: import.meta.env.COSMIC_BUCKET_SLUG || "",
  readKey: import.meta.env.COSMIC_READ_KEY || "",
});

export async function getAllProjectsTitles() {
  const data = await cosmic.objects
    .find({
      type: "projects",
    })
    .props(["title", "slug"]);

  return data.objects as Pick<ProjectData, "slug" | "title">[];
}

export async function getAllProjectsPreviewData() {
  const data = await cosmic.objects
    .find({
      type: "projects",
    })
    .props([
      "title",
      "slug",
      "metadata.cover",
      "metadata.tags",
      "metadata.description",
    ]);

  return data.objects as ProjectPreviewData[];
}

export async function getProjectData(slug: string) {
  const data = await cosmic.objects
    .findOne({
      slug,
      type: "projects",
    })
    .props([
      "title",
      "slug",
      "metadata.cover",
      "metadata.repo",
      "metadata.link",
      "metadata.overview",
      "metadata.solution",
      "metadata.results",
      "metadata.tags",
      "metadata.description",
    ]);

  return data.object as ProjectData;
}

export async function getSkillsData() {
  const data = await cosmic.objects
    .find({
      type: "skills",
    })
    .props([
      "title",
      "slug",
      "metadata.description",
      "metadata.website",
      "metadata.subskills.title",
      "metadata.subskills.slug",
      "metadata.subskills.metadata.website",
    ]);

  return data.objects as SkillData[];
}

export async function getJobsData() {
  const data = await cosmic.objects
    .find({
      type: "jobs",
    })
    .props([
      "metadata.job_title",
      "metadata.company",
      "metadata.company_website",
      "metadata.company_slug",
      "metadata.location",
      "metadata.roles.metadata.role_title",
      "metadata.roles.metadata.description",
      "metadata.roles.metadata.date.start",
      "metadata.roles.metadata.date.end",
    ]);

  return data.objects as JobData[];
}
