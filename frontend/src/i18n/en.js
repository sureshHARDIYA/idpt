const en = {
  common: {
    or: 'or',
    cancel: 'Cancel',
    reset: 'Reset',
    save: 'Save',
    search: 'Search',
    edit: 'Edit',
    remove: 'Remove',
    new: 'New',
    export: 'Export to Excel',
    noDataToExport: 'No data to export',
    import: 'Import',
    discard: 'Discard',
    yes: 'Yes',
    no: 'No',
    pause: 'Pause',
    areYouSure: 'Are you sure?',
    view: 'View',
    destroy: 'Delete',
    mustSelectARow: 'Must select a row',
    bioData: 'Import biodata',
    bioGraph: 'BioGraph',
  },

  app: {
    title: 'Application',
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
      create: {
        success: 'Assignment created successfully',
      },
      update: {
        success: 'Assignment updated successfully',
      },
      destroy: {
        success: 'Assignment deleted successfully',
      },
      destroyAll: {
        success: 'Assignment(s) deleted successfully',
      },
      fields: {
        id: 'ID',
        title: 'Title',
        sub_title: 'Sub Title',
      },
      new: {
        title: 'New Assignment',
      },
      edit: {
        title: 'Edit Assignment',
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
        success: 'Patient saved successfully',
      },
      update: {
        success: 'Patient saved successfully',
      },
      destroy: {
        success: 'Patient deleted successfully',
      },
      destroyAll: {
        success: 'Patient(s) deleted successfully',
      },
      edit: {
        title: 'Edit Patient',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        birthdateRange: 'Birthdate',
        birthdate: 'Birthdate',
        gender: 'Gender',
        user: 'User',
        phone: 'Phone',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        gender: {
          male: 'Male',
          female: 'Female',
        },
      },
      new: {
        title: 'New Patient',
      },
      view: {
        title: 'View Patient',
        welcome: 'Welcome back:  ',
        module: 'List of Tasks in the module: ',
      },
      importer: {
        title: 'Import Patients',
        fileName: 'patient_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
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
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
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
          'Files/Images columns must be the URLs of the files separated by space.',
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
        success: 'Module saved successfully',
      },
      update: {
        success: 'Module saved successfully',
      },
      destroy: {
        success: 'Module deleted successfully',
      },
      destroyAll: {
        success: 'Module(s) deleted successfully',
      },
      edit: {
        title: 'Edit Module',
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
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        status: {
          ACTIVE: 'ACTIVE',
          INACTIVE: 'INACTIVE',
          DRAFT: 'DRAFT',
        },
      },
      new: {
        title: 'New Module',
      },
      view: {
        title: 'View Module',
      },
      importer: {
        title: 'Import Modules',
        fileName: 'module_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
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
        success: 'Task saved successfully',
      },
      update: {
        success: 'Task saved successfully',
      },
      destroy: {
        success: 'Task deleted successfully',
      },
      destroyAll: {
        success: 'Task(s) deleted successfully',
      },
      edit: {
        title: 'Edit Task',
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
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
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
          'Files/Images columns must be the URLs of the files separated by space.',
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
        success: 'Audio saved successfully',
      },
      update: {
        success: 'Audio saved successfully',
      },
      destroy: {
        success: 'Audio deleted successfully',
      },
      destroyAll: {
        success: 'Audio(s) deleted successfully',
      },
      edit: {
        title: 'Edit Audio',
      },
      fields: {
        id: 'Id',
        url: 'Url',
        audiolengthRange: 'Audiolength',
        audiolength: 'Audiolength',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      new: {
        title: 'New Audio',
      },
      view: {
        title: 'View Audio',
      },
      importer: {
        title: 'Import Audio',
        fileName: 'audio_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
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
        success: 'Video saved successfully',
      },
      update: {
        success: 'Video saved successfully',
      },
      destroy: {
        success: 'Video deleted successfully',
      },
      destroyAll: {
        success: 'Video(s) deleted successfully',
      },
      edit: {
        title: 'Edit Video',
      },
      fields: {
        id: 'Id',
        url: 'Url',
        videoLengthRange: 'videoLength',
        videoLength: 'videoLength',
        name: 'Evaluation Criteria Field',
        operator: 'Evaluation Operator',
        requiredWatchTime: 'Required Watch Time',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        evaluationCriteria: {
          GREATERTHAN: 'GREATER THAN (>)',
          LESSTHAN: 'LESS THAN (<)',
          EQUALS: 'EQUALS (==)',
        },
      },
      new: {
        title: 'New Video',
      },
      view: {
        title: 'View Video',
      },
      importer: {
        title: 'Import Video',
        fileName: 'video_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
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
        success: 'Text saved successfully',
      },
      update: {
        success: 'Text saved successfully',
      },
      destroy: {
        success: 'Text deleted successfully',
      },
      destroyAll: {
        success: 'Text(s) deleted successfully',
      },
      edit: {
        title: 'Edit Text',
      },
      fields: {
        id: 'Id',
        contentHTML: 'ContentHTML',
        totalreadtimeRange: 'Totalreadtime',
        totalreadtime: 'Totalreadtime',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      new: {
        title: 'New Text',
      },
      view: {
        title: 'View Text',
      },
      importer: {
        title: 'Import Documents',
        fileName: 'document_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
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
        success: 'Record saved successfully',
      },
      update: {
        success: 'Record saved successfully',
      },
      destroy: {
        success: 'Record deleted successfully',
      },
      destroyAll: {
        success: 'Record(s) deleted successfully',
      },
      edit: {
        title: 'Edit record',
      },
      fields: {
        id: 'Id',
        description: 'Description',
        host: 'Cased',
        state: 'State',
        owner: 'Patient',
        status: 'Status',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
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
        title: 'New record',
      },
      view: {
        title: 'View record',
      },
      importer: {
        title: 'Import records',
        fileName: 'record_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
      },
      module: {
        title: 'View Module',
      },
      task: {
        title: 'View Task',
      },
    },
    evaluationCriteria: {
      name: 'evaluationCriteria',
      label: 'Evaluation Criteria',
      create: {
        success: 'Evaluation criteria saved successfully',
      },
      update: {
        success: 'Evaluation criteria saved successfully',
      },
      destroy: {
        success: 'Evaluation criteria deleted successfully',
      },
      destroyAll: {
        success:
          'Evaluation criteria(s) deleted successfully',
      },
      edit: {
        title: 'Edit Evaluation criteria',
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
        success: 'Taxonomy saved successfully',
      },
      update: {
        success: 'Taxonomy saved successfully',
      },
      destroy: {
        success: 'Taxonomy deleted successfully',
      },
      destroyAll: {
        success: 'Taxonomies deleted successfully',
      },
      edit: {
        title: 'Edit Taxonomy',
      },
      fields: {
        id: 'Id',
        parent: 'Parent',
        name: 'Name',
        status: 'Status',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        status: {
          ACTIVE: 'ACTIVE',
          INACTIVE: 'INACTIVE',
          DRAFT: 'DRAFT',
        },
      },
      new: {
        title: 'New Taxonomy',
      },
      view: {
        title: 'View Taxonomy',
      },
      importer: {
        title: 'Import Taxonomies',
        fileName: 'taxonomy_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    bioAnalyzed: {
      name: 'bioAnalyzed',
      label: 'BioAnalyzed',
      menu: 'BioAnalyzed',
      single: 'BioAnalyzed',
      exporterFileName: 'bioAnalyzed_export',
      list: {
        menu: 'BioAnalyzed',
        title: 'BioAnalyzed',
      },
      create: {
        success: 'BioAnalyzed saved successfully',
      },
      update: {
        success: 'BioAnalyzed saved successfully',
      },
      destroy: {
        success: 'BioAnalyzed deleted successfully',
      },
      destroyAll: {
        success: 'BioAnalyzeds deleted successfully',
      },
      edit: {
        title: 'Edit BioAnalyzed',
      },
      fields: {
        id: 'Id',
        dataType: 'Data type',
        score: 'Score',
        timeStart: 'Time start',
        timeEnd: 'Time end',
        patientName: 'Patient name',
        patientId: 'Patient ID',
        dataId: 'Data ID',
        status: 'Status',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        status: {
          ACTIVE: 'ACTIVE',
          INACTIVE: 'INACTIVE',
          DRAFT: 'DRAFT',
        },
      },
      new: {
        title: 'Find graph',
      },
      view: {
        title: 'View BioAnalyzed',
      },
      importer: {
        title: 'Import BioAnalyzeds',
        fileName: 'bioAnalyzed_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
      },
      bioGraph : {
        title: 'BioGraph'
      },
      bioDataImporter: {
        title: 'Import BioData',
        fileName: 'bioData_import_template',
        hint:
          'Drop CSV file or click to upload',
      },
    },

  },

  auth: {
    profile: {
      title: 'Edit Profile',
      success: 'Profile updated successfully',
    },
    createAnAccount: 'Create an account',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password',
    signin: 'Sign in',
    signup: 'Sign up',
    signout: 'Sign out',
    alreadyHaveAnAccount:
      'Already have an account? Sign in.',
    signinWithAnotherAccount:
      'Sign in with another account',
    emailUnverified: {
      message: `Please confirm your email at <strong>{0}</strong> to continue.`,
      submit: `Resend email verification`,
    },
    emptyPermissions: {
      message: `You have no permissions yet. Wait for the admin to grant you privileges.`,
    },
    passwordResetEmail: {
      message: 'Send password reset email',
      error: `Email not recognized`,
    },
    passwordReset: {
      message: 'Reset password',
    },
    emailAddressVerificationEmail: {
      error: `Email not recognized`,
    },
    verificationEmailSuccess: `Verification email sent successfully`,
    passwordResetEmailSuccess: `Password reset email sent successfully`,
    passwordResetSuccess: `Password changed successfully`,
    verifyEmail: {
      success: 'Email successfully verified',
      message:
        'Just a moment, your email is being verified...',
    },
  },

  roles: {
    owner: {
      label: 'Owner',
      description: 'Full access to all resources',
    },
    editor: {
      label: 'Editor',
      description: 'Edit access to all resources',
    },
    viewer: {
      label: 'Viewer',
      description: 'View access to all resources',
    },
    auditLogViewer: {
      label: 'Audit Log Viewer',
      description: 'Access to view audit logs',
    },
    iamSecurityReviewer: {
      label: 'Security Reviewer',
      description: `Full access to manage users roles`,
    },
    entityEditor: {
      label: 'Entity Editor',
      description: 'Edit access to all entities',
    },
    entityViewer: {
      label: 'Entity Viewer',
      description: 'View access to all entities',
    },
    patientEditor: {
      label: 'Patient Editor',
      description: 'Edit access to Patients',
    },
    patient: {
      label: 'Patient',
      description: 'View access to Patients',
    },
    casedEditor: {
      label: 'Case Editor',
      description: 'Edit access to Cases',
    },
    casedViewer: {
      label: 'Case Viewer',
      description: 'View access to Cases',
    },
    moduleEditor: {
      label: 'Module Editor',
      description: 'Edit access to Modules',
    },
    moduleViewer: {
      label: 'Module Viewer',
      description: 'View access to Modules',
    },
    taskEditor: {
      label: 'Task Editor',
      description: 'Edit access to Tasks',
    },
    taskViewer: {
      label: 'Task Viewer',
      description: 'View access to Tasks',
    },
    bioAnalyzedEditor: {
      label: 'BioAnalyzed Editor',
      description: 'Edit access to BioAnalyzeds',
    },
    bioAnalyzedViewer: {
      label: 'BioAnalyzed Viewer',
      description: 'View access to BioAnalyzed',
    },
    audioEditor: {
      label: 'Audio Editor',
      description: 'Edit access to Audio',
    },
    audioViewer: {
      label: 'Audio Viewer',
      description: 'View access to Audio',
    },
    documentEditor: {
      label: 'Text Editor',
      description: 'Edit access to Documents',
    },
    documentViewer: {
      label: 'Text Viewer',
      description: 'View access to Documents',
    },
  },

  iam: {
    title: 'Identity and Access Management',
    menu: 'IAM',
    disable: 'Disable',
    disabled: 'Disabled',
    enabled: 'Enabled',
    enable: 'Enable',
    doEnableSuccess: 'User enabled successfully',
    doDisableSuccess: 'User disabled successfully',
    doDisableAllSuccess: 'User(s) disabled successfully',
    doEnableAllSuccess: 'User(s) enabled successfully',
    doAddSuccess: 'User(s) saved successfully',
    doUpdateSuccess: 'User saved successfully',
    viewBy: 'View By',
    users: {
      name: 'users',
      label: 'Users',
      exporterFileName: 'users_export',
      doRemoveAllSelectedSuccess:
        'Permissions removed successfully',
    },
    roles: {
      label: 'Roles',
      doRemoveAllSelectedSuccess:
        'Permissions removed successfully',
    },
    edit: {
      title: 'Edit User',
    },
    new: {
      title: 'New User(s)',
      titleModal: 'New User',
      emailsHint:
        'Separate multiple email addresses using the comma character.',
    },
    view: {
      title: 'View User',
      activity: 'Activity',
    },
    importer: {
      title: 'Import Users',
      fileName: 'users_import_template',
      hint:
        'Files/Images columns must be the URLs of the files separated by space. Relationships must be the ID of the referenced records separated by space. Roles must be the role ids separated by space.',
    },
    errors: {
      userAlreadyExists:
        'User with this email already exists',
      userNotFound: 'User not found',
      disablingHimself: `You can't disable yourself`,
      revokingOwnPermission: `You can't revoke your own owner permission`,
    },
  },

  user: {
    fields: {
      id: 'Id',
      authenticationUid: 'Authentication Uid',
      avatars: 'Avatar',
      email: 'Email',
      emails: 'Email(s)',
      fullName: 'Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      status: 'Status',
      disabled: 'Disabled',
      phoneNumber: 'Phone Number',
      role: 'Role',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
      roleUser: 'Role/User',
      roles: 'Roles',
      createdAtRange: 'Created at',
      password: 'Password',
      patient: 'Patient',
      rememberMe: 'Remember me',
    },
    enabled: 'Enabled',
    disabled: 'Disabled',
    validations: {
      // eslint-disable-next-line
      email: 'Email ${value} is invalid',
    },
  },

  auditLog: {
    menu: 'Audit Logs',
    title: 'Audit Logs',
    exporterFileName: 'audit_log_export',
    entityNamesHint:
      'Separate multiple entities using the comma character.',
    fields: {
      id: 'Id',
      timestampRange: 'Period',
      entityName: 'Entity',
      entityNames: 'Entities',
      entityId: 'Entity ID',
      action: 'Action',
      values: 'Values',
      timestamp: 'Date',
      createdByEmail: 'User Email',
    },
  },
  settings: {
    title: 'Settings',
    menu: 'Settings',
    save: {
      success:
        'Settings saved successfully. The page will reload in {0} seconds for changes to take effect.',
    },
    fields: {
      theme: 'Theme',
    },
    colors: {
      default: 'Default',
      cyan: 'Cyan',
      'geek-blue': 'Geek Blue',
      gold: 'Gold',
      lime: 'Lime',
      magenta: 'Magenta',
      orange: 'Orange',
      'polar-green': 'Polar Green',
      purple: 'Purple',
      red: 'Red',
      volcano: 'Volcano',
      yellow: 'Yellow',
    },
  },
  home: {
    menu: 'Home',
    message: `This page uses fake data for demonstration purposes only. You can edit it at frontend/view/home/HomePage.js.`,
    charts: {
      day: 'Day',
      red: 'Red',
      green: 'Green',
      yellow: 'Yellow',
      grey: 'Grey',
      blue: 'Blue',
      orange: 'Orange',
      months: {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
      },
      eating: 'Eating',
      drinking: 'Drinking',
      sleeping: 'Sleeping',
      designing: 'Designing',
      coding: 'Coding',
      cycling: 'Cycling',
      running: 'Running',
      customer: 'Customer',
    },
  },
  errors: {
    backToHome: 'Back to home',
    403: `Sorry, you don't have access to this page`,
    404: 'Sorry, the page you visited does not exist',
    500: 'Sorry, the server is reporting an error',
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
    defaultErrorMessage: 'Ops, an error occurred',
  },
  // See https://github.com/jquense/yup#using-a-custom-locale-dictionary
  /* eslint-disable */
  validation: {
    mixed: {
      default: '${path} is invalid',
      required: '${path} is required',
      oneOf:
        '${path} must be one of the following values: ${values}',
      notOneOf:
        '${path} must not be one of the following values: ${values}',
      notType: ({ path, type, value, originalValue }) => {
        return `${path} must be a ${type}`;
      },
    },
    string: {
      length:
        '${path} must be exactly ${length} characters',
      min: '${path} must be at least ${min} characters',
      max: '${path} must be at most ${max} characters',
      matches:
        '${path} must match the following: "${regex}"',
      email: '${path} must be a valid email',
      url: '${path} must be a valid URL',
      trim: '${path} must be a trimmed string',
      lowercase: '${path} must be a lowercase string',
      uppercase: '${path} must be a upper case string',
      selected: '${path} must be selected',
    },
    number: {
      min:
        '${path} must be greater than or equal to ${min}',
      max: '${path} must be less than or equal to ${max}',
      lessThan: '${path} must be less than ${less}',
      moreThan: '${path} must be greater than ${more}',
      notEqual: '${path} must be not equal to ${notEqual}',
      positive: '${path} must be a positive number',
      negative: '${path} must be a negative number',
      integer: '${path} must be an integer',
    },
    date: {
      min: '${path} field must be later than ${min}',
      max: '${path} field must be at earlier than ${max}',
    },
    boolean: {},
    object: {
      noUnknown:
        '${path} field cannot have keys not specified in the object shape',
    },
    array: {
      min: '${path} field must have at least ${min} items',
      max:
        '${path} field must have less than or equal to ${max} items',
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: 'Upload',
    image: 'You must upload an image',
    size: 'File is too big. Max allowed size is {0}',
    formats: `Invalid format. Must be '{0}'.`,
  },
  importer: {
    line: 'Line',
    status: 'Status',
    pending: 'Pending',
    imported: 'Imported',
    error: 'Error',
    total: `{0} imported, {1} pending and {2} with error`,
    importedMessage: `Processed {0} of {1}.`,
    noNavigateAwayMessage:
      'Do not navigate away from this page or import will be stopped.',
    completed: {
      success:
        'Import completed. All rows were successfully imported.',
      someErrors:
        'Processing completed, but some rows were unable to be imported.',
      allErrors: 'Import failed. There are no valid rows.',
    },
    form: {
      downloadTemplate: 'Download the template',
      hint:
        'Click or drag the file to this area to continue',
    },
    list: {
      discardConfirm:
        'Are you sure? Non-imported data will be lost.',
    },
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  autocomplete: {
    loading: 'Loading...',
  },

  imagesViewer: {
    noImage: 'No image',
  },
};

export default en;
