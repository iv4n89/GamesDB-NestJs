import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/roles.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  createRole(createRoleDto: CreateRoleDto) {
    const role: Role = this.roleRepository.create({
      ...createRoleDto,
      isAdmin: createRoleDto?.isAdmin ?? 0,
    });
    return this.roleRepository.save(role);
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    const role: Role = await this.roleRepository.findOne({
      where: { id },
    });
    Object.assign(role, updateRoleDto);
    return this.roleRepository.save(role);
  }

  findAllRoles() {
    return this.roleRepository.find();
  }

  findRole(id: number) {
    return this.roleRepository.findOne({
      where: { id },
    });
  }

  deleteRole(id: number) {
    return this.roleRepository.delete({ id });
  }
}
