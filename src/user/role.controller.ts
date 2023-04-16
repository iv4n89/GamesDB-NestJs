import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { RoleService } from "./role.service";

@Controller('role')
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
    ) {}

    @Get()
    findAll() {
        return this.roleService.findAllRoles();
    }

    @Get(':id')
    findRole(@Param('id', ParseIntPipe) id: number) {
        return this.roleService.findRole(id);
    }

    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.createRole(createRoleDto);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto) {
        return this.roleService.updateRole(id, updateRoleDto);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.roleService.deleteRole(id);
    }

}