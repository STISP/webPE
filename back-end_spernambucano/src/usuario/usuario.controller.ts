import { Body, Controller, Get, NotFoundException, Post, Query, Request } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./usuario.entity";

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly UsuarioService: UsuarioService) { }

  @Post('cadastro')
  async cadastrar(@Body() usuario: Usuario): Promise<Usuario> {
    return this.UsuarioService.cadastrar(usuario);
  }

  @Post('login')
  async login(@Body() credentials: { email: string; senha: string }): Promise<{ success: boolean }> {
    const { email, senha } = credentials;
    const isValid = await this.UsuarioService.login(email, senha);
    return { success: isValid };
  }

  @Get('check-email')
  async checkEmail(@Query('email') email: string): Promise<{ exists: boolean }> {
    const exists = await this.UsuarioService.checkEmailExists(email);
    return { exists };
  }

  @Get('nome')
  async getNome(@Query('email') email: string): Promise<{ nome: string | null }> {
    const nome = await this.UsuarioService.getNome(email);
    return { nome };
  }

  //permições de acesso do novo usuario para as entidades cadastroNovoUsuario, acessoContratos, acessoAdicionarContratos, acessoDeletarContratos. quero individualmente
  // @Get('cadastroNovoUsuario')
  // async getCadastroNovoUsuario(@Query('email') email: string): Promise<{ cadastroNovoUsuario: boolean | null }> {
  //   const cadastroNovoUsuario = await this.UsuarioService.getCadastroNovoUsuario(email);
  //   return { cadastroNovoUsuario };
  // }

  // @Get('acessoContratos')
  // async getAcessoContratos(@Query('email') email: string): Promise<{ acessoContratos: boolean | null }> {
  //   const acessoContratos = await this.UsuarioService.getAcessoContratos(email);
  //   return { acessoContratos };
  // }

  // @Get('acessoAdicionarContratos')
  // async getAcessoAdicionarContratos(@Query('email') email: string): Promise<{ acessoAdicionarContratos: boolean | null }> {
  //   const acessoAdicionarContratos = await this.UsuarioService.getAcessoAdicionarContratos(email);
  //   return { acessoAdicionarContratos };
  // }

  // @Get('acessoDeletarContratos')
  // async getAcessoDeletarContratos(@Query('email') email: string): Promise<{ acessoDeletarContratos: boolean | null }> {
  //   const acessoDeletarContratos = await this.UsuarioService.getAcessoDeletarContratos(email);
  //   return { acessoDeletarContratos };
  // }
}