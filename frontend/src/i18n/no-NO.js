const no = {
  common: {
    or: 'eller',
    cancel: 'Avbryt',
    reset: 'Nullstill',
    save: 'Lagre',
    search: 'Søk',
    edit: 'Rediger',
    remove: 'Fjern',
    new: 'Ny',
    export: 'Eksporter til Excel',
    noDataToExport: 'Ingen data å eksportere',
    import: 'Importer',
    discard: 'Forkast',
    yes: 'Ja',
    no: 'Nei',
    pause: 'Pause',
    areYouSure: 'Er du sikker?',
    view: 'Se',
    destroy: 'Slett',
    mustSelectARow: 'Må velge en rad',
    CSV: 'Importer CSV',
  },

  app: {
    title: 'Applikasjon',
  },

  entities: {
    assignments: {
      name: 'Assignments',
      label: 'Assignments',
      menu: 'Assignments',
      list: {
        menu: 'Assignments',
        title: 'Assignments',
      },
      destroy: {
        success: 'Sletting av Assignment vellykket',
      },
      destroyAll: {
        success: 'Sletting av Assignment(s) vellykket',
      },
      fields: {
        id: 'ID',
        title: 'Title',
        sub_title: 'Sub Title',
      },
      new: {
        title: 'Ny Assignment',
      },
      edit: {
        title: 'Rediger Assignment',
      },
    },
    assignmentResponse: {
      name: 'assignment Response',
      label: 'Responses',
      menu: 'Responses',
      list: {
        menu: 'Response',
        title: 'Response',
      },
      destroy: {
        success: 'Assignment Response deleted successfully',
      },
      destroyAll: {
        success: 'Assignment Response deleted successfully',
      },
      fields: {
        id: 'ID',
        title: 'Title',
        createdAt: 'Created at',
      },
      new: {
        title: 'New Assignment Response ',
      },
      edit: {
        title: 'Edit Assignment Response',
      },
    },
    patient: {
      name: 'patient',
      label: 'Patients',
      menu: 'Patients',
      exporterFileName: 'patient_export',
      list: {
        menu: 'Patients',
        title: 'Patients',
      },
      create: {
        success: 'Lagring av Patient vellykket',
      },
      update: {
        success: 'Lagring av Patient vellykket',
      },
      destroy: {
        success: 'Sletting av Patient vellykket',
      },
      destroyAll: {
        success: 'Sletting av Patient(s) vellykket',
      },
      edit: {
        title: 'Rediger Patient',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        birthdateRange: 'Birthdate',
        birthdate: 'Birthdate',
        gender: 'Gender',
        user: 'User',
        phone: 'Phone',
        createdAt: 'Opprettet',
        updatedAt: 'Oppdatert',
        createdAtRange: 'Opprettet',
      },
      enumerators: {
        gender: {
          male: 'Male',
          female: 'Female',
        },
      },
      new: {
        title: 'Ny Patient',
      },
      view: {
        title: 'Se Patient',
        welcome: 'Velkommen tilbake:  ',
        module: 'Liste av Tasks i modulen: ',
      },
      importer: {
        title: 'Import Patients',
        fileName: 'patient_import_template',
        hint:
          'Fil/bildekolonner må være filenes URLer separert med mellomrom.',
      },
    },

    cased: {
      name: 'cased',
      label: 'Cases',
      menu: 'Cases',
      exporterFileName: 'cased_export',
      list: {
        menu: 'Cases',
        title: 'Cases',
      },
      create: {
        success: 'Case saved successfully',
      },
      update: {
        success: 'Case saved successfully',
      },
      destroy: {
        success: 'Case deleted successfully',
      },
      destroyAll: {
        success: 'Case(s) deleted successfully',
      },
      edit: {
        title: 'Edit Case',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        status: 'Status',
        featuredImage: 'FeaturedImage',
        modules: 'Modules',
        taxonomies: 'Taxonomies',
        patients: 'Patients',
        availableFromRange: 'AvailableFrom',
        availableFrom: 'AvailableFrom',
        createdAt: 'Opprettet',
        updatedAt: 'Oppdatert',
        createdAtRange: 'Opprettet',
        audience: 'Assign Patients to the case',
        audienceList: 'Patient List',
      },
      enumerators: {
        status: {
          ACTIVE: 'ACTIVE',
          INACTIVE: 'INACTIVE',
          DRAFT: 'DRAFT',
        },
        audience: {
          ALL: 'All patients',
          USER: 'Selected patients from the list',
        },
      },
      new: {
        title: 'New Case',
      },
      view: {
        title: 'View Case',
      },
      importer: {
        title: 'Import Cases',
        fileName: 'cased_import_template',
        hint:
          'Fil/bildekolonner må være filenes URLer separert med mellomrom.',
      },
    },

    module: {
      name: 'module',
      label: 'Modules',
      menu: 'Modules',
      single: 'Module',
      exporterFileName: 'module_export',
      list: {
        menu: 'Modules',
        title: 'Modules',
      },
      create: {
        success: 'Lagring av Module vellyket',
      },
      update: {
        success: 'Lagring av Module vellyket',
      },
      destroy: {
        success: 'Sletting av Module vellyket',
      },
      destroyAll: {
        success: 'Sletting av Module(s) vellyket',
      },
      edit: {
        title: 'Rediger Module',
      },
      fields: {
        id: 'Id',
        owner: 'Owner',
        name: 'Name',
        next: 'Next task',
        description: 'Description',
        status: 'Status',
        tasks: 'Tasks',
        taxonomies: 'Taxonomies',
        featuredImage: 'FeaturedImage',
        prerequisite: 'Prerequisite',
        createdAt: 'Opprettet',
        updatedAt: 'Oppdatert',
        createdAtRange: 'Opprettet',
      },
      enumerators: {
        status: {
          ACTIVE: 'ACTIVE',
          INACTIVE: 'INACTIVE',
          DRAFT: 'DRAFT',
        },
      },
      new: {
        title: 'Ny Module',
      },
      view: {
        title: 'Se Module',
      },
      importer: {
        title: 'Import Modules',
        fileName: 'module_import_template',
        hint:
          'Fil/bildekolonner må være filenes URLer separert med mellomrom.',
      },
    },

    task: {
      name: 'task',
      label: 'Tasks',
      menu: 'Tasks',
      single: 'Task',
      exporterFileName: 'task_export',
      list: {
        menu: 'Tasks',
        title: 'Tasks',
      },
      create: {
        success: 'Lagring av Task vellykket',
      },
      update: {
        success: 'Lagring av Task vellykket',
      },
      destroy: {
        success: 'Sletting av Task vellykket',
      },
      destroyAll: {
        success: 'Sletting av Task(s) vellykket',
      },
      edit: {
        title: 'Rediger Task',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        status: 'Status',
        tags: 'Tags',
        pointsRange: 'Points',
        points: 'Points',
        completionRequired: 'CompletionRequired',
        complexityLevelRange: 'ComplexityLevel',
        complexityLevel: 'ComplexityLevel',
        type: 'Type',
        owner: 'Owner',
        taxonomies: 'Taxonomies',
        elements: 'Elements',
        next: 'Next task',
        createdAt: 'Opprettet',
        updatedAt: 'Oppdatert',
        createdAtRange: 'Opprettet',
        assignments: 'Add assignment',
      },
      enumerators: {
        status: {
          ACTIVE: 'ACTIVE',
          INACTIVE: 'INACTIVE',
          DRAFT: 'DRAFT',
        },
        type: {
          AUDIO: 'AUDIO',
          VIDEO: 'VIDEO',
          TEXT: 'TEXT',
          DOCUMENT: 'DOCUMENT',
          ASSESSMENT: 'ASSESSMENT',
          FEEDBACK: 'FEEDBACK',
        },
      },
      new: {
        title: 'New Task',
      },
      view: {
        title: 'View Task',
      },
      importer: {
        title: 'Import Tasks',
        fileName: 'task_import_template',
        hint:
          'Fil/bildekolonner må være filenes URLer separert med mellomrom.',
      },
    },

    audio: {
      name: 'audio',
      label: 'Audio',
      menu: 'Audio',
      exporterFileName: 'audio_export',
      list: {
        menu: 'Audio',
        title: 'Audio',
      },
      create: {
        success: 'Lagring av Audio vellykket',
      },
      update: {
        success: 'Lagring av Audio vellykket',
      },
      destroy: {
        success: 'Sletting av Audio vellykket',
      },
      destroyAll: {
        success: 'Sletting av Audio(s) vellykket',
      },
      edit: {
        title: 'Rediger Audio',
      },
      fields: {
        id: 'Id',
        url: 'Url',
        audiolengthRange: 'Audiolength',
        audiolength: 'Audiolength',
        createdAt: 'Opprettet',
        updatedAt: 'Oppdatert',
        createdAtRange: 'Opprettet',
      },
      enumerators: {},
      new: {
        title: 'New Audio',
      },
      view: {
        title: 'Se Audio',
      },
      importer: {
        title: 'Import Audio',
        fileName: 'audio_import_template',
        hint:
          'Fil/bildekolonner må være filenes URLer separert med mellomrom.',
      },
    },

    video: {
      name: 'video',
      label: 'Video',
      menu: 'Video',
      exporterFileName: 'video_export',
      list: {
        menu: 'Video',
        title: 'Video',
      },
      create: {
        success: 'Lagring av Video vellykket',
      },
      update: {
        success: 'Lagring av Video vellykket',
      },
      destroy: {
        success: 'Sletting av Video vellykket',
      },
      destroyAll: {
        success: 'Sletting av Video(s) vellykket',
      },
      edit: {
        title: 'Rediger Video',
      },
      fields: {
        id: 'Id',
        url: 'Url',
        videoLengthRange: 'videoLength',
        videoLength: 'videoLength',
        name: 'Evaluation Criteria Field',
        operator: 'Evaluation Operator',
        requiredWatchTime: 'Required Watch Time',
        createdAt: 'Opprettet',
        updatedAt: 'Oppdatert',
        createdAtRange: 'Opprettet',
      },
      enumerators: {
        evaluationCriteria: {
          GREATERTHAN: 'GREATER THAN (>)',
          LESSTHAN: 'LESS THAN (<)',
          EQUALS: 'EQUALS (==)',
        },
      },
      new: {
        title: 'Ny Video',
      },
      view: {
        title: 'Se Video',
      },
      importer: {
        title: 'Importer Video',
        fileName: 'video_import_template',
        hint:
          'Fil/bildekolonner må være filenes URLer separert med mellomrom.',
      },
    },

    document: {
      name: 'document',
      label: 'Documents',
      menu: 'Documents',
      exporterFileName: 'document_export',
      list: {
        menu: 'Documents',
        title: 'Documents',
      },
      create: {
        success: 'Lagring av tekst vellykket',
      },
      update: {
        success: 'Lagring av tekst vellykket',
      },
      destroy: {
        success: 'Sletting av tekst vellykket',
      },
      destroyAll: {
        success: 'Sletting av tekst vellykket',
      },
      edit: {
        title: 'Rediger tekst',
      },
      fields: {
        id: 'Id',
        contentHTML: 'ContentHTML',
        totalreadtimeRange: 'Totalreadtime',
        totalreadtime: 'Totalreadtime',
        createdAt: 'Opprettet',
        updatedAt: 'Oppdatert',
        createdAtRange: 'Opprettet',
      },
      enumerators: {},
      new: {
        title: 'Ny tekst',
      },
      view: {
        title: 'Se tekst',
      },
      importer: {
        title: 'Import Documents',
        fileName: 'document_import_template',
        hint:
          'Fil/bildekolonner må være filenes URLer separert med mellomrom.',
      },
    },

    record: {
      name: 'record',
      label: 'Records',
      menu: 'Records',
      exporterFileName: 'record_export',
      list: {
        menu: 'Records',
        title: 'Records',
      },
      create: {
        success: 'Lagring av Record vellykket',
      },
      update: {
        success: 'Lagring av Record vellykket',
      },
      destroy: {
        success: 'Sletting av Record vellykket',
      },
      destroyAll: {
        success: 'Lagring av Record(s) vellykket',
      },
      edit: {
        title: 'Rediger record',
      },
      fields: {
        id: 'Id',
        description: 'Description',
        host: 'Cased',
        state: 'State',
        owner: 'Patient',
        status: 'Status',
        createdAt: 'Opprettet',
        updatedAt: 'Oppdatert',
        createdAtRange: 'Opprettet',
        roadmap: {
          tasks: 'Tasks',
          host: 'Module',
          children: 'Task',
          elements: 'Elements',
          'completion?': 'Completion?',
          completionRequired: 'Completion Required',
        },
        epic: {
          host: 'Task',
          epic: 'Epic',
          tasks: 'Tasks',
          module: 'Module',
          children: 'Task',
          roadmap: 'Roadmap',
          elements: 'Elements',
          'completion?': 'Completion?',
          completionRequired: 'Completion Required',
        },
      },
      enumerators: {
        state: {
          LOCKED: 'LOCKED',
          ACTIVE: 'ACTIVE',
          PROGRESS: 'PROGRESS',
          COMPLETE: 'COMPLETE',
        },
        status: {
          ACTIVE: 'ACTIVE',
          INACTIVE: 'INACTIVE',
          DRAFT: 'DRAFT',
        },
      },
      new: {
        title: 'Ny record',
      },
      view: {
        title: 'Se record',
      },
      importer: {
        title: 'Importer records',
        fileName: 'record_import_template',
        hint:
          'Fil/bildekolonner må være filenes URLer separert med mellomrom.',
      },
      module: {
        title: 'Se Module',
      },
      task: {
        title: 'Se Task',
      },
    },
    evaluationCriteria: {
      name: 'evaluationCriteria',
      label: 'Evalueringskriterie',
      create: {
        success: 'Lagring av evalueringskriterie vellykket',
      },
      update: {
        success: 'Lagring av evalueringskriterie vellykket',
      },
      destroy: {
        success: 'Sletting av evalueringskriterie vellykket',
      },
      destroyAll: {
        success:
          'Sletting av evalueringskriterier vellykket',
      },
      edit: {
        title: 'Rediger evalueringskriterie',
      },
      fields: {
        id: 'Id',
        field: 'Field',
        operator: 'Operator',
        valueRequired: 'Value Required',
      },
      enumerators: {
        operators: {
          GREATERTHAN: '(>)',
          LESSTHAN: '(<)',
          EQUALS: '(==)',
        },
      },
    },

    taxonomy: {
      name: 'taxonomy',
      label: 'Taxonomies',
      menu: 'Taxonomies',
      single: 'Taxonomy',
      exporterFileName: 'taxonomy_export',
      list: {
        menu: 'Taxonomies',
        title: 'Taxonomies',
      },
      create: {
        success: 'Oppretting av Taxonomy vellykket',
      },
      update: {
        success: 'Lagring av Taxonomy vellykket',
      },
      destroy: {
        success: 'Sletting av Taxonomy vellykket',
      },
      destroyAll: {
        success: 'Sletting av Taxonomies vellykket',
      },
      edit: {
        title: 'Rediger Taxonomy',
      },
      fields: {
        id: 'Id',
        parent: 'Forelder',
        name: 'Navn',
        status: 'Status',
        createdAt: 'Opprettet',
        updatedAt: 'Oppdatert',
        createdAtRange: 'Opprettet',
      },
      enumerators: {
        status: {
          ACTIVE: 'ACTIVE',
          INACTIVE: 'INACTIVE',
          DRAFT: 'DRAFT',
        },
      },
      new: {
        title: 'Ny Taxonomy',
      },
      view: {
        title: 'Se Taxonomy',
      },
      importer: {
        title: 'Importer Taxonomies',
        fileName: 'taxonomy_import_template',
        hint:
          'Fil/bildekolonner må være filenes URLer separert med mellomrom.',
      },
    },

    empatica: {
      name: 'empatica',
      label: 'Empatica',
      menu: 'Empatica',
      single: 'Empatica',
      exporterFileName: 'empatica_export',
      list: {
        menu: 'Empatica',
        title: 'Empatica',
      },
      create: {
        success: 'Oppretting av Empatica vellykket',
      },
      update: {
        success: 'Lagring av Empatica vellykket',
      },
      destroy: {
        success: 'Sletting av Empatica vellykket',
      },
      destroyAll: {
        success: 'Sletting av Empaticas vellykket',
      },
      edit: {
        title: 'Rediger Empatica',
      },
      fields: {
        id: 'Id',
        type: 'Type',
        frequency: 'Frekvens',
        timestamp: 'Timestamp',
        patient: 'Pasient',
        data: 'Data',
        status: 'Status',
        createdAt: 'Opprettet',
        updatedAt: 'Oppdatert',
        createdAtRange: 'Opprettet',
      },
      enumerators: {
        status: {
          ACTIVE: 'ACTIVE',
          INACTIVE: 'INACTIVE',
          DRAFT: 'DRAFT',
        },
      },
      new: {
        title: 'Ny Empatica',
      },
      view: {
        title: 'Se Empatica',
      },
      importer: {
        title: 'Importer Empaticas',
        fileName: 'empatica_import_template',
        hint:
          'Fil/bildekolonner må være filenes URLer separert med mellomrom.',
      },
    },
  },

  auth: {
    profile: {
      title: 'Rediger profil',
      success: 'Oppdatering av profil vellykket',
    },
    createAnAccount: 'Opprett en konto',
    rememberMe: 'Husk meg',
    forgotPassword: 'Glemt passord',
    signin: 'Logg inn',
    signup: 'Registrer deg',
    signout: 'Logg ut',
    alreadyHaveAnAccount:
      'Har du allerede en konto? Logg inn',
    signinWithAnotherAccount:
      'Logg inn med en annen konto',
    emailUnverified: {
      message: `Vennligst bekreft e-post addressen <strong>{0}</strong> for å fortsette.`,
      submit: `Send verifiseringsepost på nytt`,
    },
    emptyPermissions: {
      message: `Du har ingen tillatelser enda. Avvent en admin for å få tillatelser.`,
    },
    passwordResetEmail: {
      message: 'Send e-post for nullstilling av passord',
      error: `E-post ikke gjenkjent`,
    },
    passwordReset: {
      message: 'Nullstill passord',
    },
    emailAddressVerificationEmail: {
      error: `E-post ikke gjenkjent`,
    },
    verificationEmailSuccess: `Sending av verifiseringsepost vellykket`,
    passwordResetEmailSuccess: `Sending av e-post for passordnulstilling vellykket`,
    passwordResetSuccess: `Endring av passord vellykket`,
    verifyEmail: {
      success: 'Verifisering av e-post vellykket',
      message:
        'Bare et øyeblikk, e-post addressen din verifiseres...',
    },
  },

  roles: {
    owner: {
      label: 'Eier',
      description: 'Full tilgang til alle ressurser',
    },
    editor: {
      label: 'Editor',
      description: 'Redigeringstilgang til alle ressurser',
    },
    viewer: {
      label: 'Seer',
      description: 'Lesetilgang til alle ressurser',
    },
    auditLogViewer: {
      label: 'Revisjonsloggseer',
      description: 'Lesetingang til revisjonslogger',
    },
    iamSecurityReviewer: {
      label: 'Sikkerhetsanmelder',
      description: `Full tilgang til administrering av brukerroller`,
    },
    entityEditor: {
      label: 'Entitetsanmelder',
      description: 'Redigeringstilgang til alle entiteter',
    },
    entityViewer: {
      label: 'Entitetsseer',
      description: 'Lesetilgang til alle entiteter',
    },
    patientEditor: {
      label: 'Pasientredaktør',
      description: 'Redigeringstilgang til pasienter',
    },
    patient: {
      label: 'Pasient',
      description: 'Lesetilgang til pasienter',
    },
    casedEditor: {
      label: 'Caseredaktør',
      description: 'Redigeringstilgang til cases',
    },
    casedViewer: {
      label: 'Caseseer',
      description: 'Lesetilgang til cases',
    },
    moduleEditor: {
      label: 'Modulredaktør',
      description: 'Redigeringstilgang til moduler',
    },
    moduleViewer: {
      label: 'Modulseer',
      description: 'Lesetilgang til moduler',
    },
    taskEditor: {
      label: 'Task redaktør',
      description: 'Redigeringstilgang til Tasks',
    },
    taskViewer: {
      label: 'Task seer',
      description: 'Lesetilgang til Tasks',
    },
    audioEditor: {
      label: 'Audioredaktør',
      description: 'Redigeringstilgang til audio',
    },
    audioViewer: {
      label: 'Audio seer',
      description: 'Lesetilgang til Audio',
    },
    documentEditor: {
      label: 'Tekstredaktør',
      description: 'Redigeringstilgang til dokumenter',
    },
    documentViewer: {
      label: 'Tekstleser',
      description: 'Lesetilgang til dokumenter',
    },
  },

  iam: {
    title: 'Identitet og tilgangshåndtering',
    menu: 'IAM',
    disable: 'Deaktiver',
    disabled: 'Deaktivert',
    enabled: 'Aktivert',
    enable: 'Aktiver',
    doEnableSuccess: 'Aktivering av bruker vellykket',
    doDisableSuccess: 'Deaktivering av bruker vellykket',
    doDisableAllSuccess: 'Deaktivering av brukere vellykket',
    doEnableAllSuccess: 'Aktivering av brukere vellykket',
    doAddSuccess: 'Lagring av brukere vellykket',
    doUpdateSuccess: 'Lagrng av bruker vellykket',
    viewBy: 'Vis etter',
    users: {
      name: 'users',
      label: 'Brukere',
      exporterFileName: 'users_export',
      doRemoveAllSelectedSuccess:
        'Fjerning av rettigheter vellykket',
    },
    roles: {
      label: 'Roller',
      doRemoveAllSelectedSuccess:
        'Fjerning av rettigheter vellykket',
    },
    edit: {
      title: 'Rediger Bruker',
    },
    new: {
      title: 'Nye Brukere',
      titleModal: 'Ny Bruker',
      emailsHint:
        'Separer flere e-postaddresser med komma symbolet.',
    },
    view: {
      title: 'Se Bruker',
      activity: 'Aktivitet',
    },
    importer: {
      title: 'IMporter Brukere',
      fileName: 'users_import_template',
      hint:
        'Fil/bildekolonner må være filenes URLer separert med mellomrom. Relationships must be the ID of the referenced records separated by space. Roles must be the role ids separated by space.',
    },
    errors: {
      userAlreadyExists:
        'Bruker med denne e-postaddressen eksisterer allerede',
      userNotFound: 'Bruker ikke funnet',
      disablingHimself: `Du kan ikke deaktivere deg selv`,
      revokingOwnPermission: `Du kan ikke trekke tilbake dine egne eierrettigheter`,
    },
  },

  user: {
    fields: {
      id: 'Id',
      authenticationUid: 'Autentiserings Uid',
      avatars: 'Avatar',
      email: 'Epost',
      emails: 'Eposter',
      fullName: 'Navn',
      firstName: 'Fornavn',
      lastName: 'Etternavn',
      status: 'Status',
      disabled: 'Deaktivert',
      phoneNumber: 'Telefonnummer',
      role: 'Rolle',
      createdAt: 'Opprettet',
      updatedAt: 'Oppdatert',
      roleUser: 'Rolle/Bruker',
      roles: 'Roller',
      createdAtRange: 'Opprettet',
      password: 'Passord',
      patient: 'Pasient',
      rememberMe: 'Husk meg',
    },
    enabled: 'Aktivert',
    disabled: 'Deaktivert',
    validations: {
      // eslint-disable-next-line
      email: 'Epost ${value} er ugyldig',
    },
  },

  auditLog: {
    menu: 'Revisjonslogger',
    title: 'Revisjonslogger',
    exporterFileName: 'audit_log_export',
    entityNamesHint:
      'Separer flere entiteter med komma symbolet.',
    fields: {
      id: 'Id',
      timestampRange: 'Periode',
      entityName: 'Entitet',
      entityNames: 'Entiteter',
      entityId: 'Entitet ID',
      action: 'Handling',
      values: 'Verdier',
      timestamp: 'Dato',
      createdByEmail: 'Bruker Epost',
    },
  },
  settings: {
    title: 'Innstillinger',
    menu: 'Innstillinger',
    save: {
      success:
        'Lagring av instillinger vellyllet. Siden vil lastes på nytt om {0} sekunder for at endringene skal tre i kraft.',
    },
    fields: {
      theme: 'Tema',
    },
    colors: {
      default: 'Standard',
      cyan: 'Cyan',
      'geek-blue': 'Geek Blue',
      gold: 'Gull',
      lime: 'Lime',
      magenta: 'Magenta',
      orange: 'Oransje',
      'polar-green': 'Polargrønn',
      purple: 'Lilla',
      red: 'Rød',
      volcano: 'Vulkan',
      yellow: 'Gul',
    },
  },
  home: {
    menu: 'Hjem',
    message: `Denne siden bruker fabrikerte data for demonstrasjonsformål. Du kan redigere dem i frontend/view/home/HomePage.js.`,
    charts: {
      day: 'Dag',
      red: 'Rød',
      green: 'Grønn',
      yellow: 'Gul',
      grey: 'Grå',
      blue: 'Blå',
      orange: 'Oransje',
      months: {
        1: 'Januar',
        2: 'Februar',
        3: 'Mars',
        4: 'April',
        5: 'Mai',
        6: 'Juni',
        7: 'Juli',
      },
      eating: 'Spising',
      drinking: 'Drikking',
      sleeping: 'Soving',
      designing: 'Designing',
      coding: 'Koding',
      cycling: 'Sykling',
      running: 'Løping',
      customer: 'Kunde',
    },
  },
  errors: {
    backToHome: 'Tilbake til hjem',
    403: `Beklager, du har ikke tilgang til denne siden`,
    404: 'Beklager, siden du prøvde å få tilgang til eksisterer ikke',
    500: 'Beklager, serveren rapporterte en feil',
    forbidden: {
      message: 'Forbudt',
    },
    validation: {
      message: 'En feil forekom',
    },
    defaultErrorMessage: 'Oops, en feil forekom',
  },
  // See https://github.com/jquense/yup#using-a-custom-locale-dictionary
  /* eslint-disable */
  validation: {
    mixed: {
      default: '${path} er ugyldig',
      required: '${path} er påkrevd',
      oneOf:
        '${path} må være en av de følgende verdiene: ${values}',
      notOneOf:
        '${path} må ikke være en av de følgende verdiene: ${values}',
      notType: ({ path, type, value, originalValue }) => {
        return `${path} må være en ${type}`;
      },
    },
    string: {
      length:
        '${path} må være nøyaktig ${length} tegn',
      min: '${path} må være minst ${min} tegn',
      max: '${path} må ikke være flere enn ${max} tegn',
      matches:
        '${path} må stemme overens med følgende: "${regex}"',
      email: '${path} må være en gyldig epost',
      url: '${path} må være en gyldig URL',
      trim: '${path} må være en trimmet streng',
      lowercase: '${path} må være en streng i små bokstaver',
      uppercase: '${path} må være en string i store bokstaver',
      selected: '${path} må være valgt',
    },
    number: {
      min:
        '${path} må være større enn eller lik ${min}',
      max: '${path} må være mindre enn eller lik ${max}',
      lessThan: '${path} må være mindre enn ${less}',
      moreThan: '${path} må være større enn ${more}',
      notEqual: '${path} må ikke være lik ${notEqual}',
      positive: '${path} må være et positivt tall',
      negative: '${path} må være et negativt tall',
      integer: '${path} å være et heltall',
    },
    date: {
      min: '${path} felt må være senere enn ${min}',
      max: '${path} felt må være tidligere enn ${max}',
    },
    boolean: {},
    object: {
      noUnknown:
        '${path} felt kan ikke ha nøkler som ikke er spesifisert i objektets sammensetning',
    },
    array: {
      min: '${path} felt må ha minst ${min} gjenstander',
      max:
        '${path} må ha mindre enn eller lik ${max} gjenstander',
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: 'Last opp',
    image: 'Du må laste opp et bilde',
    size: 'Filen er for stor. Maks filstørrelse er {0}',
    formats: `Ugyldig filformat. Må være '{0}'.`,
  },
  importer: {
    line: 'Linje',
    status: 'Status',
    pending: 'Avventer',
    imported: 'Importert',
    error: 'Feil',
    total: `{0} importert, {1} avventer og {2} med feil`,
    importedMessage: `Prosessert {0} av {1}.`,
    noNavigateAwayMessage:
      'Ikke naviger vegg fra denne siden. Importeringen vil da stanses.',
    completed: {
      success:
        'Importering fullført. Alle radene ble importert.',
      someErrors:
        'Prosessering fullført, men noen rader kunne ikke importeres.',
      allErrors: 'Importering feilet. Det er ingen gyldige rader.',
    },
    form: {
      downloadTemplate: 'Last ned malen',
      hint:
        'Klikk eller dra filen til dette området for å fortsette',
    },
    list: {
      discardConfirm:
        'Er du sikker? Data som ikke er importert vil gå tapt.',
    },
    errors: {
      invalidFileEmpty: 'Filen er tom',
      invalidFileExcel:
        'Bare excel (.xlsx) filer er tillat',
      invalidFileUpload:
        'Ugyldig fil. Forsikre deg om at du bruker den siste versjonen av malen.',
      importHashRequired: 'Import hash er påkrevd',
      importHashExistent: 'Data har ellerede blitt importert',
    },
  },

  autocomplete: {
    loading: 'Laster...',
  },

  imagesViewer: {
    noImage: 'Manglende bilde',
  },
};

export default no;
