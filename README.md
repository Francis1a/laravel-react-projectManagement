<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[WebReinvent](https://webreinvent.com/)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Jump24](https://jump24.co.uk)**
- **[Redberry](https://redberry.international/laravel/)**
- **[Active Logic](https://activelogic.com)**
- **[byte5](https://byte5.de)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).















by: [The Codeholic](https://www.youtube.com/@TheCodeholic)
[Laravel Documentation 11.x](https://laravel.com/docs/11.x)

# Objectives 
* Retrieve Data from Laravel
* Authentication
* CRUD
* Submit Data
* upload Files
* Implement Pagination 
* Implement Sorting
* implement Filtering 

You can use XAMPP for database but in this project I use sqlite. 
To install all dependencies and frameworks I use PowerShell but experts say that its better to use 
GIT bash

Install Composer for php, then download laravel framework 
```git
composer create-project laravel/laravel folder-name
```

```git
php artisan breeze:install
```

![[Pasted image 20240501204933.png]]

Laravel Breeze is a minimal, open-source, authentication scaffolding for Laravel applications. It provides a simple starting point for building a Laravel application with authentication features like login, registration, password reset, email verification, and password confirmation. It also includes a profile page where users can update their name, email address, and password.

Breeze is powered by Blade and Tailwind, and can be us with Vue and React.

> [!NOTE]  
> You can run you code and check if all has been successfully installed and check the created routes, use the code bellow to run the code.

Server
```git 
php artisan serve
```

Client side
```git
npm run dev
```

Interact with entire Laravel Application 
```git
php asrtisan tinker 
```

# What is Inertia-js and how it works

Inertia is _basically a client-side routing library_. It allows you to navigate between pages without having to reload the entire page.

# Prepare the Database for Project and Task

This code create model scaffolding for Project 
```cmd
php artisan make:model Project -fm
```

This code create model scaffolding for task
```cmd
php artisan make:model Task -fm
```

#-fm for factories and migration 
factories - is for creating an random data for projects that is going to be save on sqlite 
migrations - is for creating a table or schema for sqlite 

Then make adjustment and add the desired data and tables needed for migrations 
```php
#Migration Project 
public function up(): void
    {

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description')->nullable();
            $table->timestamp('due_date')->nullable();
            $table->string('status');
            $table->string('image_path')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->timestamps();
        });
    }
```

```php
#Migration Task 
public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description')->nullable();
            $table->string('image_path')->nullable();
            $table->string('status');
            $table->string('priority');
            $table->string('due_date');
            $table->foreignId('assigned_user_id')->constrained('users');
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->foreignId('project_id')->constrained('projects');
            $table->timestamps();
        });
    }
```

Then make adjustment and add the desired data and tables needed for factories 
```php
#Factories Project
public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'description' => fake()->realText(),
            'due_date' => fake()->dateTimeBetween('now', '+1 year'),
            'status' => fake()->randomElement(['pending', 'in_progress', 'completed']),
            'image_path' => fake()->randomElement([
                'https://plus.unsplash.com/premium_photo-1712325632272-b0cbb2a27db6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1712350529844-b953287c6c09?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1712433052082-39e9ba289b9e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1712415341931-96aff76a42e9?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            ]),
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => time(),
            'updated_at' => time(),
        ];
    }
```

```php
#Factories Task 
public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'description' => fake()->realText(),
            'due_date' => fake()->dateTimeBetween('now', '+1 year'),
            'status' => fake()->randomElement(['pending', 'in_progress', 'completed']),
            'priority' => fake()->randomElement(['log', 'medium', 'high']),
            'image_path' => fake()->randomElement([
                'https://images.unsplash.com/photo-1565867254334-10280784ff69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1546919412-e3fdf03c48cb?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1534812647472-8dabaaad8caa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1599854171059-d91f0fee45cd?q=80&w=1010&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1710170600927-7a39aa2c5890?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            ]),
            'assigned_user_id' => 1,
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => time(),
            'updated_at' => time(),
        ];
    }
```

Then create data for user and for project with each tasks 
```php
public function run(): void

    {
        // User::factory(10)->create();
        User::factory()->create([
            'name' => 'Kim Dahyun',
            'email' => 'sample@gmail.com',
            'password' => bcrypt('Francis35!@#'),
            'email_verified_at' => time(),
        ]);

        Project::factory()
            ->count(30)
            ->hasTasks(30)
            ->create();
    }
```

Then run the migrations 
```cmd
php artisan migrate:refresh --seed
```

You can check or access all you data that was created on SQLITE using tinker 
```cmd
>> php artisan tinker 

>> \App\Models\Project::count()
>> 30
 
>> \App\Models\Task::count()
>> 900

>> \App\Models\Task::query()->paginate(5)-all()
>> you can try this on you editor  
```

# Create Controllers and Define Routes 

This code is going to create a scaffolding for model Project, there are two file for request which is StoreProjectRequest.php and UpdateProjectRequest.php then for ProjectController.php. 
```cmd 
php artisan make:controller ProjectController --model=Project --requests --resource
```

This Code is the same what happens on the code above but this one is for the model Task
```cmd
php artisan make:controller ProjectController --model=Task --requests --resource
```

For the Routes of you website you can modify the web.php

To check the routes of your website you can prompt this code
```cmd
php artisan route::list
```

# Render Project and Pagination




