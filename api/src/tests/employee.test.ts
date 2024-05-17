import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import app from '../app';
import Employee from '../models/employee.model';

let mongoServer: MongoMemoryServer;

describe('Employee API', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });
  
  afterEach(async () => {
    await Employee.deleteMany({});
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should create a new employee', async () => {
    const res = await request(app)
      .post('/api/employees')
      .send({
        name: 'Rafael Rolim',
        position: 'CEO',
        department: 'Leadership',
        hireDate: '2023-01-01'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Rafael Rolim');
  });

  it('should fetch all employees', async () => {
    await Employee.create({
      name: 'Rafael Rolim',
      position: 'CEO',
      department: 'Leadership',
      hireDate: '2023-01-01'
    });

    const res = await request(app).get('/api/employees');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Rafael Rolim');
  });

  it('should fetch a single employee by ID', async () => {
    const employee = await Employee.create({
      name: 'Rafael Rolim',
      position: 'CEO',
      department: 'Leadership',
      hireDate: '2023-01-01'
    });

    const res = await request(app).get(`/api/employees/${employee._id}`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Rafael Rolim');
  });

  it('should update an employee by ID', async () => {
    const employee = await Employee.create({
      name: 'Rafael Rolim',
      position: 'CEO',
      department: 'Leadership',
      hireDate: '2023-01-01'
    });

    const res = await request(app)
      .put(`/api/employees/${employee._id}`)
      .send({ name: 'Jane Doe', position: 'Developer', department: 'Engineering', hireDate: '2023-01-01' });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Jane Doe');
  });

  it('should delete an employee by ID', async () => {
    const employee = await Employee.create({
      name: 'Rafael Rolim',
      position: 'CEO',
      department: 'Leadership',
      hireDate: '2023-01-01'
    });

    const res = await request(app).delete(`/api/employees/${employee._id}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Employee deleted');
  });

  it('should return 404 when fetching a non-existing employee', async () => {
    const nonExistingId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/employees/${nonExistingId}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Employee not found');
  });

  it('should return 404 when updating a non-existing employee', async () => {
    const nonExistingId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/api/employees/${nonExistingId}`)
      .send({ name: 'Jane Doe', position: 'Developer', department: 'Engineering', hireDate: '2023-01-01' });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Employee not found');
  });

  it('should return 404 when deleting a non-existing employee', async () => {
    const nonExistingId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/employees/${nonExistingId}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Employee not found');
  });

  it('should return 400 for invalid employee data', async () => {
    const res = await request(app)
      .post('/api/employees')
      .send({
        name: '', // Invalid name
        position: 'Developer',
        department: 'Engineering',
        hireDate: 'invalid-date' // Invalid date
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Validation error.');
    expect(res.body.issues).toBeDefined();
  });
});
