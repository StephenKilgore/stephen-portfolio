---
layout: 'layouts/resume.html'
title: 'Resume'
css: '/assets/css/resume.css'
permalink: 'resume/index.html'
---

## Contact Information

- **Email**: stephenkilgore07@gmail.com
- **Phone**: (214) 715-7442
- **Location**: Dallas, Texas
- **Website**: [https://stephenkilgore.com](https://stephenkilgore.com)
- **GitHub**: [StephenKilgore](https://github.com/StephenKilgore)

## Certifications

<div class="certifications">
{% for certification in collections.certifications %}
    {% include "partials/certification.html" %}
{% endfor %}
</div>

## Work Experience

{% for job in collections.jobs %}
{% include "partials/job.html" %}
{% endfor %}

## Education

{% for education in collections.education %}
{% include "partials/education.html" %}
{% endfor %}
